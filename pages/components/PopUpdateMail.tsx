import React, { useState } from 'react';
import { firebaseClient } from '../services/firebaseClient';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function PopMail() {

  const [open, setOpen] = React.useState(false);
  const [openSucces, setOpenSucces] = React.useState(false);
  const [openErrorMailMatch, setOpenErrorMailMatch] = React.useState(false);

  var myerrorText = "";

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenSucces = () => {
    setOpenSucces(true);
  };
  const handleClickOpenErrorMailMatch = () => {
    setOpenErrorMailMatch(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; 
  const handleCloseErrorMailMatch = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorMailMatch(false);
  };
  const handleCloseSucces = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSucces(false);
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
          setOpen(false);
          setOpenSucces(true);
          var myuser = {myid: userAuth?.uid, email: newEmail}
          const user = await fetch(
          `http://localhost:3000/api/users/edit`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(myuser),
          });
        }).catch(function(error:any) {
          // An error happened.
          console.log("Error occured in update mail")
          console.log(error)
        });
      }).catch(function(error:any) {
        // An error happened.
        console.log("Error occured in re auth profil")
        console.log(error)
      });
    }
    else{
      myerrorText = "Les 2 adresses mails ne correspondent pas";
      setOpenErrorMailMatch(true);
    }
  }

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Changer Mail
      </Button>
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
          (document.getElementById("newMail2Pop1") as HTMLInputElement).value)}} 
          color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
      <div className={useStyles().root}>
        <Snackbar open={openSucces} autoHideDuration={6000} onClose={handleCloseSucces}>
          <Alert onClose={handleCloseSucces} severity="success">
            Votre adresse mail a bien été changée
          </Alert>
        </Snackbar>
        <Snackbar open={openErrorMailMatch} autoHideDuration={6000} onClose={handleCloseErrorMailMatch}>
          <Alert onClose={handleCloseErrorMailMatch} severity="error">
            {myerrorText}
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}
