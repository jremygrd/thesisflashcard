import React, { useState, useEffect, Component } from "react";
import next, { GetServerSideProps } from "next";
//import Form from "../deckForm/form.tsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import "../../../styles/Home.module.css";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Drawer from "../../components/Drawer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import SaveIcon from "@material-ui/icons/Save";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

// }));

const useStyles = makeStyles((theme: Theme) =>
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
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export type Question = {
  id: string;
  question: string;
  answer: string[];
  tip: string;
  bad_options: string[];
};

export default function Deck({ cardsData, deckData, sessionUser }: any) {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const textStyle = isMobile ? "text-mobile" : "text-mobile";

  const [number, setNumber] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(cardsData);

  const [quest, setQuest] = useState(cardsData[number].question);
  const [answers, setAnswers] = useState(cardsData[number].answer);
  const [bad_options, setBadOptions] = useState(cardsData[number].bad_options);
  const [tip, setTip] = useState(cardsData[number].tip);

  const [allOptions, setAllOptions] = useState(
    cardsData[number].answer.concat(cardsData[number].bad_options)
  );

  const [prevIdx, setprevidx] = useState(0);

  const [deckSettingsView, setDeckSettingsView] = useState(true);
  const [deckTitle, setDeckTitle] = useState(deckData.title);

  const [firstload, setFirstLoad] = useState(true);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Question[]>(cardsData);

  const [saveNew, setSavenew] = useState([""]);

  const [lockWait, setLockWait] = useState(false);

  // SnackBar
  const [message, setMessage] = useState("");

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //Fin snackbar

  //Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  //Fin modal

  useEffect(() => {
    startPage();
  });

  const startPage = async () => {
    if (firstload) {
      setQuestions(cardsData);
      setSearchResults(cardsData);
      setFirstLoad(false);
    }
    console.log(saveNew, questions);
  };

  const changeCard = async (idx: any, force: boolean) => {
    if (isCardGood(force) || force) {
      if (!force) {
        submitChange();
      }
      setDeckSettingsView(false);
      // questions[prevIdx].question = quest;
      // questions[prevIdx].answer = answers;
      // questions[prevIdx].bad_options = bad_options;

      setNumber(idx);
      setQuest(questions[idx].question);
      setTip(questions[idx].tip);
      setAnswers(questions[idx].answer);
      setBadOptions(questions[idx].bad_options);
      setAllOptions(questions[idx].answer.concat(questions[idx].bad_options));
      setprevidx(idx);
    } else {
      console.log("Please correct issues before moving to next card");
    }
  };

  function changeBad(idx: any, e: any, val: any) {
    const updatedAll = [...allOptions];
    updatedAll[idx] = e.target.value;
    setAllOptions(updatedAll);

    const updatedCats = [...bad_options];
    idx = updatedCats.indexOf(val);
    updatedCats[idx] = e.target.value;
    setBadOptions(updatedCats);
  }

  function changeGood(idx: any, e: any, val: any) {
    const updatedAll = [...allOptions];
    updatedAll[idx] = e.target.value;
    setAllOptions(updatedAll);

    console.log(val);
    const updatedCats = [...answers];
    idx = updatedCats.indexOf(val);
    updatedCats[idx] = e.target.value;
    setAnswers(updatedCats);
  }

  function isCardGood(force: boolean) {
    var ans = true;

    if (allOptions.length == 0) {
      ans = false;
      if (!force) handleClick("La carte doit avoir au moins une bonne réponse");
    }

    if (answers.length == 0) {
      ans = false;
      if (!force) handleClick("La carte doit avoir au moins une bonne réponse");
    }

    if (quest == "") {
      ans = false;
      if (!force) handleClick("La carte doit avoir une question");
    }

    if (answers.length == 1 && answers[0] == "") {
      ans = false;
      if (!force) handleClick("La carte doit avoir au moins une bonne réponse");
    }

    return ans;
  }

  const addOption = () => {
    const updatedCats = [...allOptions];
    const badOpts = [...bad_options];
    if (updatedCats.includes("conditionpourempêcher nouvelleoption") == false) {
      updatedCats.push("");
      badOpts.push("");
      setBadOptions(badOpts);
      setAllOptions(updatedCats);
    }
  };

  function deleteOption(val: any) {
    if (null != [1]) {
      if (answers.includes(val) && allOptions.length > 1) {
        setAnswers(
          answers.filter((checked_option: any) => checked_option !== val)
        );
      }
      if (bad_options.includes(val) && allOptions.length > 1) {
        setBadOptions(
          bad_options.filter((checked_option: any) => checked_option !== val)
        );
      }
      if (allOptions.includes(val) && allOptions.length > 1) {
        setAllOptions(
          allOptions.filter((checked_option: any) => checked_option !== val)
        );
      }
    } else {
      console.log("You can't delete this, you need at least one good answer");
    }

    // Now we check if the user deleted all options. At least one good answer is mandatory
  }

  function handleCheckAnswer(val: any) {
    if (answers.includes(val)) {
      const ans = answers.filter(
        (checked_option: any) => checked_option !== val
      );
      setAnswers(ans);
      bad_options.push(val);
      setBadOptions([...bad_options]);
    } else {
      const ans = bad_options.filter(
        (checked_option: any) => checked_option !== val
      );
      setBadOptions(ans);
      answers.push(val);
      setAnswers([...answers]);
    }
  }

  const addCard = () => {
    if (lockWait == false) {
      if (saveNew.length < 3 && isCardGood(false)) {
        // Fix bug et anti flood de la database
        if (saveNew == [""]) {
          submitChange();
        }

        const questionsArr = questions;
        const newid = create_UUID();
        let arr2 = saveNew;
        arr2.push(newid);
        setSavenew(arr2);
        const blank = {
          id: newid,
          question: "",
          tip: "",
          bad_options: [],
          answer: [""],
          fk_user: sessionUser,
        };
        questionsArr.push(blank);
        setQuestions(questionsArr);
        setSearchResults(questionsArr);
        changeCard(questionsArr.indexOf(blank), false);
      } else {
        if (saveNew.length > 2) changeCard(number, false);
      }
    } // For safety purposes, in case the lock is stuck
    else {
      setLockWait(false);
    }
  };

  const DeckSettings = () => {
    if (isCardGood(false)) {
      setDeckSettingsView(true);
    }
  };

  const delCard = () => {
    setLockWait(true);
    changeCard(number - 1, true);

    if (saveNew.includes(questions[number].id) == true) {
      setSavenew(saveNew.filter((val: any) => val !== questions[number].id));
    }

    let toDel = questions[number];
    delCardDB(toDel);
  };

  const delCardDB = async (toDel: any) => {
    const deletecard = await fetch(
      `http://localhost:3000/api/editDeck/deletecard`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toDel),
      }
    ).then(refetchCards);
  };

  const refetchCards = async () => {
    const sessionUser = "1w7K30BqJFTR6rJLKdAP9aasoKM2"; //JEAN
    const slug = deckData.id;

    const opts = { fk_deck: slug, fk_user: sessionUser };

    const cards = await fetch(
      `http://localhost:3000/api/cards_stacks/${slug}`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
      }
    );
    let bodystream = await cards.json();
    setQuestions(bodystream);
    setSearchResults(bodystream);
    setLockWait(false);
  };

  async function submitChange() {
    //Remove null options
    //Check that we have at least 2 options
    //Check that we have at least one good answer
    if (allOptions.includes("")) {
      setAllOptions(
        allOptions.filter((checked_option: any) => checked_option !== "")
      );
      setBadOptions(
        bad_options.filter((checked_option: any) => checked_option !== "")
      );
      setAnswers(
        answers.filter((checked_option: any) => checked_option !== "")
      );
    } else {
    }
    if (allOptions.length > 0 && answers.length > 0) {
      const update = questions;
      update[number].answer = answers;
      update[number].bad_options = bad_options;
      update[number].question = quest;
      update[number].tip = tip;
      setQuestions(update);
      setSearchResults(update);
      if (saveNew.includes(update[number].id) == false) {
        const upload = await fetch(
          `http://localhost:3000/api/editDeck/submitChanges`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(update[number]),
          }
        );
      } else {
        const upload = await fetch(
          `http://localhost:3000/api/editDeck/addcard`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question: update[number],
              user: sessionUser,
              deck: deckData,
            }),
          }
        ); //.then(res => res.json()).then(res=> questions[number].id=res.uuid);
        //console.log(upload,upload.json);
        setSavenew(saveNew.filter((val: any) => val !== update[number].id));
      }
    } else {
      console.log("The card must have at least 1 good answer ");
    }
  }

  const searcher = (e: any) => {
    setSearch(e);
    var result = questions.filter((q: { question: string }) =>
      q.question.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    if (e == "") {
      result = questions;
    }
    setSearchResults(result);
  };

  const searchCardMobile = () => {};

  return (
    <>
      {!isMobile ? (
        <>
          <div className={styles.deckSettings} onClick={DeckSettings}>
            {deckData.title.slice(0, 25) + " ⚙️"}
          </div>
          <input
            className={styles.searchBar}
            id="searchInput"
            type="search"
            placeholder="🔍 Search"
            value={search}
            onChange={(e) => searcher(e.target.value)}
          />
        </>
      ) : null}

      <div className={isMobile ? styles.splitbottom : styles.splitleft}>
        {questions[0] ? (
          <>
            {searchResults.map(
              (questionsMapped: { question: string; id: string }, idx) => (
                <div
                  onClick={() =>
                    changeCard(
                      questions.findIndex(
                        (q: { id: string }) => q.id === questionsMapped.id
                      ),
                      false
                    )
                  }
                  key={questionsMapped.id}
                  className={isMobile ? styles.listCardMobile : styles.listCard}
                >
                  {" "}
                  {questionsMapped.question
                    ? questionsMapped.question.length > 25
                      ? questionsMapped.question.slice(0, 25) + "..."
                      : questionsMapped.question
                    : null}
                </div>
              )
            )}
          </>
        ) : null}

        <div
          key="AddCard"
          onClick={() => addCard()}
          className={
            isMobile ? styles.listCardAddCardMobile : styles.listCardAddCard
          }
        >
          {isMobile ? "➕" : "Ajouter une carte"}
        </div>

        <div className={styles.fixlastelem}>f</div>
      </div>
      <div className={isMobile ? styles.splitupper : styles.splitright}>
        <div className={isMobile ? styles.cardeditMobile : styles.cardedit}>
          {!deckSettingsView ? (
            <>
              <div className={styles.inputQuestionCard}>
                <div className={styles.circledivSave}>
                  <IconButton
                    aria-label="grid"
                    onClick={() => changeCard(number, false)}
                  >
                    <SaveIcon fontSize="large" />
                  </IconButton>
                </div>

                <TextField
                  id="standard-multiline-static"
                  multiline
                  fullWidth
                  rows={2}
                  label="Question"
                  autoComplete="off"
                  value={quest}
                  onChange={(e) => setQuest(e.target.value)}
                />
              </div>

              {allOptions.map((val: any, idx: any) => (
                <div className={styles.addOptionCard}>
                  <div className={styles.optionWrapper} key={idx}>
                    <div className={styles.supprEdit}>
                      <IconButton
                        key={idx}
                        aria-label="grid"
                        onClick={() => deleteOption(val)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>

                    <div className={styles.optionEdit}>
                      <TextField
                        id="standard-multiline-static"
                        multiline
                        fullWidth
                        rows={1}
                        label="Réponse"
                        autoComplete="off"
                        value={val}
                        key={idx}
                        onChange={
                          answers.includes(val)
                            ? (e) => changeGood(idx, e, val)
                            : (e) => changeBad(idx, e, val)
                        }
                      />
                    </div>
                    <input
                      type="checkbox"
                      id="subscribeNews"
                      name="option"
                      value={quest}
                      key={idx}
                      checked={answers.includes(val)}
                      className={styles.checkboxOpt}
                      onChange={() => handleCheckAnswer(val)}
                    />
                  </div>
                </div>
              ))}

              <div className={styles.addOptionCard}>
                Ajouter une réponse
                <IconButton aria-label="grid" onClick={addOption}>
                  <AddBoxIcon fontSize="large" />
                </IconButton>
              </div>

              {
                // On affiche l'input texte d'indice si clic sur le bouton
                //(pour l'instant on met juste un espace dans le tip), mais on pourrait faire un hook pour être plus propre
                tip.length == 0 ? (
                  <div className={styles.addOptionCard}>
                    Ajouter un indice
                    <IconButton aria-label="grid" onClick={() => setTip(" ")}>
                      <EmojiObjectsIcon fontSize="large" />
                    </IconButton>
                  </div>
                ) : (
                  <div className={styles.addOptionCard}>
                    <div className={styles.optionWrapper}>
                      <div className={styles.supprEdit}>
                        <IconButton aria-label="grid">
                          <EmojiObjectsIcon fontSize="small" />
                        </IconButton>
                      </div>

                      <div className={styles.optionEdit}>
                        <TextField
                          id="standard-multiline-static"
                          multiline
                          fullWidth
                          rows={1}
                          label="Indice"
                          autoComplete="off"
                          value={tip}
                          onChange={(e) => setTip(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )
              }

              <div className={styles.delOptionCard}>
                Supprimer la carte
                <IconButton
                  aria-label="grid"
                  onClick={delCard}
                  disabled={lockWait}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </div>
            </>
          ) : (
            <>
              <div className={styles.inputQuestionCard}>
                <TextField
                  id="standard-multiline-static"
                  multiline
                  fullWidth
                  rows={2}
                  label="Deck Title"
                  autoComplete="off"
                  value={deckTitle}
                  onChange={(e) => setDeckTitle(e.target.value)}
                />
              </div>
            </>
          )}
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {message}
            </Alert>
          </Snackbar>
        </div>
      </div>
      {isMobile ? (
        <>
          <div
            key="DeckInfo"
            onClick={DeckSettings}
            className={styles.listDeckMobile}
          >
            {" "}
            {deckData.title.slice(0, 25) + " ⚙️"}
          </div>

          <div
            key="DeckInfo"
            onClick={handleOpenModal}
            className={styles.searchMobile}
          >
            {" "}
            {"🔍"}
          </div>
        </>
      ) : null}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <div>
              <input
                className={styles.search}
                id="searchInput"
                type="search "
                placeholder="🔍 Search "
                value={search}
                onChange={(e) => searcher(e.target.value)}
              />
            </div>
            {searchResults
              .slice(0, 5)
              .map((questionsMapped: { question: string; id: string }, idx) => (
                <div
                  onClick={() =>
                    changeCard(
                      questions.findIndex(
                        (q: { id: string }) => q.id === questionsMapped.id
                      ),
                      false
                    )
                  }
                  key={questionsMapped.id + "mobSearch"}
                  className={isMobile ? styles.listCardMobile : styles.listCard}
                >
                  {" "}
                  {questionsMapped.question
                    ? questionsMapped.question.length > 25
                      ? questionsMapped.question.slice(0, 25) + "..."
                      : questionsMapped.question
                    : null}
                </div>
              ))}
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionUser = "1w7K30BqJFTR6rJLKdAP9aasoKM2"; //JEAN
  const slug = context.query.decks;

  const opts = { fk_deck: slug, fk_user: sessionUser };

  const deckById = await fetch(`http://localhost:3000/api/decks/${slug}`);
  const deckData = await deckById.json();

  const cardsByIds = await fetch(
    `http://localhost:3000/api/cards_stacks/${slug}`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
    }
  );

  const cardsData = await cardsByIds.json();

  return {
    props: {
      deckData,
      cardsData,
      sessionUser,
    },
  };
};

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
