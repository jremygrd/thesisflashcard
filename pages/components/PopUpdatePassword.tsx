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

  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
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

  const updatePassword=async (email:any,password:any,newPassword:any,newPassword2:any) => {
    if(newPassword == newPassword2) {
      var userAuth = firebaseClient.auth().currentUser;
      var credential = firebaseClient.auth.EmailAuthProvider.credential(email, password);
      userAuth?.reauthenticateWithCredential(credential).then(function() {
        // User re-authenticated.
        userAuth?.updatePassword(newPassword).then (async function() {
          setOpen3(true);
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

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen2}>
        Changer Mot de passe
      </Button>
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
      <div className={useStyles().root}>
        <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}>
          <Alert onClose={handleClose3} severity="success">
            Votre mot de passe a bien été changée
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}
