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

const sessionUser = '1w7K30BqJFTR6rJLKdAP9aasoKM2'


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
    },
  })
);


export default function ModalUnsplash(deckData) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setImage= async (url) =>{
    const opts = { fk_deck: deckData.children.id, fk_user: sessionUser,imageUrl:url};

    const authorjson = await fetch(
      `http://localhost:3000/api/decks/setUnsplash`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
      }
    );
    handleClose()
    deckData.children.imageUrl = url;
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
      <button type="button" onClick={handleOpen}>
        Change picture
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
            <>
              <form className={styles.formuns} onSubmit={searchPhotos}>
                {" "}
                <label className={styles.labeluns} htmlFor="query">
                  {" "}
                  📷
                </label>
                <input
                  type="text"
                  name="query"
                  className={styles.inputuns}
                  placeholder={`Try "dog" or "apple"`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className={styles.buttonuns}>
                  Search
                </button>
              </form>
              <div  className={styles.cardunscont}>
              <div className={styles.cardunslist}>
              
                {pics.map((pic) => (
                  <div className={styles.carduns} key={pic.id}>
                    <img
                      className={styles.cardunsimage}
                      alt={pic.alt_description}
                      src={pic.urls.full}
                      width="50%"
                      height="50%"
                      onClick={() => setImage(pic.urls.full)}
                    ></img>
                  </div>
                ))}{" "}
              </div>
              </div>
            </>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
