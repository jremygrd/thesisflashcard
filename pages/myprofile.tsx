import React, { useState } from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from './services/firebaseAdmin';
import { firebaseClient } from './services/firebaseClient';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import next, { GetServerSideProps } from 'next';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import PopUpdateMail from '../pages/components/PopUpdateMail';
import PopUpdatePassword from '../pages/components/PopUpdatePassword';

import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Email } from '@material-ui/icons';


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const myuser = await fetch ("http://localhost:3000/api/users/" + token.uid);
    const userData = await myuser.json();
    return {
      props: {
        userData 
      }
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {} as never,
    };
  }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);




const updateUser=async (firstName:any,email:any) => {
  var userAuth = firebaseClient.auth().currentUser;
  console.log(userAuth?.uid,firstName,email)
  var myuser = {myid: userAuth?.uid, name:firstName, email: email}
  const user = await fetch(
  `http://localhost:3000/api/users/edit`,
  {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(myuser),
  });
}

export default function Home({userData}:any) {
  const [email, setEmail] = useState('');  
  const [name, setName] = useState(userData.name); 

  return (  
    <div>
    <form className={useStyles().root} noValidate autoComplete="off">
      <TextField 
        id="emailBox" 
        label="Email"
        onChange={(e) => setEmail(e.target.value)}  
        variant="outlined" 
        value={userData.email} >

      </TextField>
      <TextField 
      id="nameBox" 
      label="Prénom" 
      variant="outlined" 
      onChange={(e) => setName(e.target.value)}
      value={name} ></TextField>
      <Button 
        variant="contained" 
        color="primary"
        onClick={async () => { 
        updateUser((document.getElementById("nameBox") as HTMLInputElement).value,(document.getElementById("emailBox") as HTMLInputElement).value);
      }}> 
        Sauvegarder
      </Button>
      {/* <PopUpdateMail/> */}
      <PopUpdatePassword/>
      <Button
        onClick={async () => {
          await firebaseClient.auth().signOut();
          window.location.href = '/';
        }}
        variant="contained" 
        color="secondary">
          Se déconnecter
      </Button>
    </form>
  </div>
  )
}
