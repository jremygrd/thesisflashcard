import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import { ok } from 'assert';


import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReportIcon from '@material-ui/icons/Report';
import { IconButton } from '@material-ui/core';
import { CheckBox, Visibility } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export default function CreateNote(sessionUser:any, sessionCard:any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log("ça marche")
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [newNote, setNewNote] = useState("");
  const [router,setRouter] = useState(useRouter());
  const [Visible1, setVisible1] = useState(false);
  const [Visible2, setVisible2] = useState(false);
  const [ope, setOpe] = React.useState(false);

  const createText =()=>{
    setVisible1(!Visible1);
    setVisible2(!Visible2); 
  }

  async function SpellingMistakes(){
    const upload = await fetch(`http://localhost:3000/api/note/create`,
          {
              
            // je veux : implémenter un compteur dans la database, pour compter le nombre de personnes qui vont signaler les erreurs
            //           écrire les erreurs dans la database à l'endroit associé à la carte. 
            // Database à changer ? 
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error_name : "spelling_mistakes", text_error : "",  fk_card : sessionCard.children}),
          }).then(res => res.json()).then( res=> redirectTo(res.uuidstack) );
          
  }

  async function Meaningless(){
    const upload = await fetch(`http://localhost:3000/api/note/create`,
          {
              
            // je veux : implémenter un compteur dans la database, pour compter le nombre de personnes qui vont signaler les erreurs
            //           écrire les erreurs dans la database à l'endroit associé à la carte. 
            // Database à changer ? 
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error_name : "false_answer", text_error : "",  fk_card : sessionCard.children}),
          }).then(res => res.json()).then( res=> redirectTo(res.uuidstack) );
          
  }

  async function FalseAnswer(){
    const upload = await fetch(`http://localhost:3000/api/note/create`,
          {
              
            // je veux : implémenter un compteur dans la database, pour compter le nombre de personnes qui vont signaler les erreurs
            //           écrire les erreurs dans la database à l'endroit associé à la carte. 
            // Database à changer ? 
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error_name : "meaningless", text_error : "",  fk_card : sessionCard.children}),
          }).then(res => res.json()).then( res=> redirectTo(res.uuidstack) );
          
  }

  async function submitNewNote_Other(){
    const upload = await fetch(`http://localhost:3000/api/note/create`,
          {
              
            // je veux : implémenter un compteur dans la database, pour compter le nombre de personnes qui vont signaler les erreurs
            //           écrire les erreurs dans la database à l'endroit associé à la carte. 
            // Database à changer ? 
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({error_name : "Autre", text_error : {newNote},  fk_card : sessionCard.children}),
          }).then(res => res.json()).then( res=> redirectTo(res.uuidstack) );
          
  }
  
  const redirectTo = (uuidstack:any)=>{
    router.push(`/decks/edit/${uuidstack}`);
  }


  const handleClos = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpe(false);
  };
  //SNACKBAR

  return (
    <>
      <IconButton aria-label="grid" onClick={handleOpen}>
        <ReportIcon fontSize="small"/>
      </IconButton>
      <Modal
        
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <div>
                  {' '}
                  Que voulez-vous dire ? 
                  {!Visible2?<>
                  <Button variant="contained" color="primary" onClick={SpellingMistakes} >
                   Orthographe
                  </Button> 
                  <Button variant="contained" color="primary" onClick={FalseAnswer} >
                   Réponse(s) fausse(s)
                  </Button> 
                  <Button variant="contained" color="primary" onClick={Meaningless} >
                   Carte incompréhensible
                  </Button>
                  <Button variant="contained" color="primary" onClick={createText} >
                   Autre
                  </Button>
                  </>:null}
                  
                  
                  {Visible1?<>
                  <Button variant="contained" color="primary" onClick={submitNewNote_Other} >
                    Envoyer
                  </Button> 
                  
                  <input
                      type="text"
                      name="proposal"
                      id="proposal"
                      placeholder="New Note"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}/>
                      
                  </>:null}
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                  >
                   Supprimer
                  </Button>

                                  
                </div>
                 <Snackbar open={ope} autoHideDuration={6000} onClose={handleClos}>
                  <Alert onClose={handleClos} severity="success">
                    Remarque chargée!
                  </Alert>
                 </Snackbar>   
          </div>
        </Fade>
      </Modal>
    </>
  );
}
