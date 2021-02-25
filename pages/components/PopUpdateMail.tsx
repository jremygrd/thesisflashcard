import React, { useEffect, useState } from 'react';
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

export default function PopMail(openParent:any) {

  const [isOpenChangeMail, setisOpenChangeMail] = React.useState(openParent.children[0]);;
  const [openSucces, setOpenSucces] = React.useState(false);
  const [openError,setOpenError] = React.useState(false);
  const [myerrorText, setMyerrorText] = useState(''); 

  useEffect(()=>{
    setisOpenChangeMail(openParent.children[0])
})

  const handleClickOpen = () => {
    setisOpenChangeMail(true);
    openParent.children[1](true)
  };
  const handleClickOpenSucces = () => {
    setOpenSucces(true);
  };
  const handleClickOpenError = () => {
   setOpenError(true);
  };

  const handleClose = () => {
    setisOpenChangeMail(false);
    openParent.children[1](false)
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


  const updateMail=async (email:any,password:any,newEmail:any,newEmail2:any) => {
    if(newEmail == newEmail2) {
      var userAuth = firebaseClient.auth().currentUser;
      var credential = firebaseClient.auth.EmailAuthProvider.credential(email, password);
      userAuth?.reauthenticateWithCredential(credential).then(function() {
        // User re-authenticated.
        userAuth?.updateEmail(newEmail).then (async function() {
          // Update successful.
          console.log("update email success")
          setisOpenChangeMail(false);
          openParent.children[1](false);
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
          // error in new mail
          if(error.code == "auth/email-already-in-use") {
            setMyerrorText("Cette adresse mail est déjà utilisée");
           setOpenError(true);
          }
          else if(error.code == "auth/invalid-email") {
            setMyerrorText("Format de l'adresse mail invalide");
           setOpenError(true);
          }
          console.log(error)
        });
      }).catch(function(error:any) {
        // Error in re-auth
        if(error.code == "auth/wrong-password") {
          setMyerrorText("Mot de passe invalide");
         setOpenError(true);
        }
        if(error.code == "auth/invalid-email") {
          console.log("ok")
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
      setMyerrorText("Les 2 adresses mails ne correspondent pas");
     setOpenError(true);
    }
  }

  return (
    <div>
      {/* <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Changer Mail
      </Button> */}
          {/* Pop up to change mail adress */}
    <Dialog open={isOpenChangeMail} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Changer d'adresse mail de connexion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour changer votre adresse mail de connexion veuillez rentrez vos anciennes informations de connexion avant.
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
        <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error">
            {myerrorText}
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}