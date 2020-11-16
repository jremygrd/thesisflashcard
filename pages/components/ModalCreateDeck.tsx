import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { useState,useEffect } from 'react';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

export default function TransitionsModal(sessionUser:any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [newDeckName, setNewDeckName] = useState("");
  const [router,setRouter] = useState(useRouter());

  async function submitNewDeck(){
    const upload = await fetch(`http://localhost:3000/api/decks/create`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({title : newDeckName, fk_user : sessionUser.children}),
          }).then(res => res.json()).then( res=> redirectTo(res.uuidstack) );
          
  }
  
  const redirectTo = (uuidstack:any)=>{
    router.push(`/decks/edit/${uuidstack}`);
  }

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Create new Deck
      </button>
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
          <div >
                  {' '}
                  Enter deck name :
                  <input
                      type="text"
                      name="proposal"
                      id="proposal"
                      placeholder="New Deck"
                      value={newDeckName}
                      onChange={(e) => setNewDeckName(e.target.value)}
                  />
                  <input type="button" value="Submit" onClick={submitNewDeck} />                
                </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
