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
  const [openError,setOpenError] = React.useState(false);
  const [myerrorText, setMyerrorText] = useState(''); 


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenSucces = () => {
    setOpenSucces(true);
  };
  const handleClickOpenError = () => {
   setOpenError(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; 
  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

   setOpenError(false);
  };
  const handleCloseSucces = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSucces(false);
  };

  const updatePassword=async (email:any,password:any,newPassword:any,newPassword2:any) => {
    if(newPassword == newPassword2) {
      var userAuth = firebaseClient.auth().currentUser;
      var credential = firebaseClient.auth.EmailAuthProvider.credential(email, password);
      userAuth?.reauthenticateWithCredential(credential).then(function() {
        // User re-authenticated.
        userAuth?.updatePassword(newPassword).then (async function() {
          setOpen(false);
          setOpenSucces(true);
          console.log("Password update succesfull")
          // Update successful.
        }).catch(function(error) {
          // error in new password
          if(error.code == "auth/weak-password") {
            setMyerrorText("Le nouveau mot de passe doit comporter au moins 6 caractères");
           setOpenError(true);
          }
          console.log(error)
        });
      }).catch(function(error) {
        // error in re-auth
        if(error.code == "auth/wrong-password") {
          setMyerrorText("Mot de passe invalide");
         setOpenError(true);
        }
        if(error.code == "auth/invalid-email") {
          setMyerrorText("Adresse mail incorrecte");
         setOpenError(true);
        }
        if(error.code == "auth/user-mismatch") {
          setMyerrorText("L'adresse mail indiquée ne correspond pas avec l'adresse mail sur laquel vous êtes connecté");
         setOpenError(true);
        }
        console.log(error);
      });
    }
    else{
      setMyerrorText("Les 2 mots de passe ne correspondent pas");
      setOpenError(true);  
    }
  }

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Changer Mot de passe
      </Button>
      {/* Pop up to change password */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
          onClick={() => {updatePassword((document.getElementById("actualMailPop2") as HTMLInputElement).value,
          (document.getElementById("passwordPop2") as HTMLInputElement).value,
          (document.getElementById("newPasswordPop2") as HTMLInputElement).value,
          (document.getElementById("newPassword2Pop2") as HTMLInputElement).value)}} 
          color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
      <div className={useStyles().root}>
        <Snackbar open={openSucces} autoHideDuration={6000} onClose={handleCloseSucces}>
          <Alert onClose={handleCloseSucces} severity="success">
            Votre mot de passe a bien été changé
          </Alert>
        </Snackbar>
        <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error">
            {myerrorText}
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}