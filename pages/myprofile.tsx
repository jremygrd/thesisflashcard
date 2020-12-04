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
    root2: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const updatePassword=async (email:any,password:any,newPassword:any,newPassword2:any) => {
  if(newPassword == newPassword2) {
    var userAuth = firebaseClient.auth().currentUser;
    var credential = firebaseClient.auth.EmailAuthProvider.credential(email, password);
    userAuth?.reauthenticateWithCredential(credential).then(function() {
      // User re-authenticated.
      userAuth?.updatePassword(newPassword).then (async function() {
        console.log("Password update succesfull")
        // Update successful.
      }).catch(function(error) {
        // An error happened.
        console.log("Error occured in update password")
        console.log(error)
      });
    }).catch(function(error) {
      // An error happened.
      console.log("Error occured in re auth profil")
      console.log(error)
    });
  }
  else{console.log("Erreur : Les 2 adresses mails ne sont pas les mêmes");}
}


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
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; 

  const handleClose2 = () => {
    setOpen2(false);
  }; 

  const handleClick3 = () => {
    setOpen3(true);
  };

  const handleClose3 = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen3(false);
  };

  const updateMail=async (email:any,password:any,newEmail:any,newEmail2:any) => {
    if(newEmail == newEmail2) {
      var userAuth = firebaseClient.auth().currentUser;
      var credential = firebaseClient.auth.EmailAuthProvider.credential(email, password);
      userAuth?.reauthenticateWithCredential(credential).then(function() {
        // User re-authenticated.
        userAuth?.updateEmail(newEmail).then (async function() {
          // Update successful.
          console.log("update email success")
          setOpen3(true);
          var myuser = {myid: userAuth?.uid, email: newEmail}
          const user = await fetch(
          `http://localhost:3000/api/users/edit`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(myuser),
          });
        }).catch(function(error) {
          // An error happened.
          console.log("Error occured in update mail")
          console.log(error)
        });
      }).catch(function(error) {
        // An error happened.
        console.log("Error occured in re auth profil")
        console.log(error)
      });
    }
    else{console.log("Erreur : Les 2 adresses mails ne sont pas les mêmes");}
  }

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
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Changer Mail
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClickOpen2}>
        Changer Mot de passe
      </Button>
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
    {/* Pop up to change mail adress */}
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour changer votre mot de passe taper votre ancienne adresse mail et mot de passe d'abord
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="actualMailPop1"
            label="Adresse mail actuelle"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="actualPasswordPop1"
            label="Mot de passe"
            type="password"
            fullWidth
          />
          <TextField
            margin="dense"
            id="newMailPop1"
            label="Nouvelle adresse mail"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="newMail2Pop1"
            label="Confirmez votre nouvelle adresse mail"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
          onClick={() => {updateMail((document.getElementById("actualMailPop1") as HTMLInputElement).value,
          (document.getElementById("actualPasswordPop1") as HTMLInputElement).value,
          (document.getElementById("newMailPop1") as HTMLInputElement).value,
          (document.getElementById("newMail2Pop1") as HTMLInputElement).value);handleClose()}} 
          color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pop up to change password */}
    <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour changer votre adresse mail de connexion taper votre ancienne adresse mail et mot de passe d'abord
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="actualMailPop2"
            label="Adresse mail"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="passwordPop2"
            label="Mot de passe actuel"
            type="password"
            fullWidth
          />
          <TextField
            margin="dense"
            id="newPasswordPop2"
            label="Nouveau Mot de passe"
            type="password"
            fullWidth
          />
          <TextField
            margin="dense"
            id="newPassword2Pop2"
            label="Confirmez votre nouveau mot de passe"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            Cancel
          </Button>
          <Button 
          onClick={() => {updatePassword((document.getElementById("actualMailPop2") as HTMLInputElement).value,
          (document.getElementById("passwordPop2") as HTMLInputElement).value,
          (document.getElementById("newPasswordPop2") as HTMLInputElement).value,
          (document.getElementById("newPassword2Pop2") as HTMLInputElement).value);handleClose2()}} 
          color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
      <div className={useStyles().root2}>
      <Button variant="outlined" onClick={handleClick3}>
        Open success snackbar
      </Button>
      <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}>
        <Alert onClose={handleClose3} severity="success">
          Votre adresse mail a bien été changée
        </Alert>
      </Snackbar>
      </div>
  </div>
  )
}
