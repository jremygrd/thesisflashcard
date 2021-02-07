import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Unsplash, { toJson } from "unsplash-js";
import {Button } from '@material-ui/core';
const sessionUser = '1w7K30BqJFTR6rJLKdAP9aasoKM2'

import Unsplash2 from "../Unsplash/unsplash"


const unsplash = new Unsplash({
  accessKey: 'ZvfuxnWlIQv6i-LuLQRzre4ikKph1Cld4OIl3f1eUWQ'
});

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflow:'scroll',
      height:"90%",
      width:"90%",
    },
  })
);


export default function ModalUnsplash(deckData) {
  // console.log(deckData.children);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setImage= async (url) =>{

    if (deckData.children[2])
    {
    const opts = { fk_deck: deckData.children[0].id, fk_user: sessionUser,imageUrl:url};

    const authorjson = await fetch(
      `http://localhost:3000/api/decks/setUnsplash`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
      }
    );

  }
    handleClose()
    deckData.children[0].imageUrl = url;
  }

  const searchPhotos = async (e) => {
    e.preventDefault();

    unsplash.search
      .photos(query)
      .then(toJson)
      .then((json) => {
        // console.log(json);
        setPics(json.results);
      });
  };

  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);

  const [router, setRouter] = useState(useRouter());

  return (
    <div>
      <Button onClick = {handleOpen} variant="contained">Librairie d'images</Button>
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
            <>
              <Unsplash2> deckData = {deckData.children[0].id} handleClose = {handleClose} handleUpdate={deckData.children[1]}{deckData.children[2]}</Unsplash2>
            </>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
