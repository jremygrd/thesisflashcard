import React, { useState, useEffect } from 'react'
import styles from '../../styles/Home.module.css'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AddIcon from '@material-ui/icons/Add';
import ReportIcon from '@material-ui/icons/Report';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import CreateIcon from '@material-ui/icons/Create';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TextField from '@material-ui/core/TextField';
import Indice from './Indice';
import FutureSeance from './futureSeances';
import ReplayIcon from '@material-ui/icons/Replay';
import { startOfDecade } from 'date-fns/esm';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, InputBase, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import DehazeIcon from '@material-ui/icons/Dehaze';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SaveIcon from '@material-ui/icons/Save';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';


export type Question = {
    id: string;
    question: string;
    answer: string[];
    tip: string;
    streak: number;
    streakct: number;
    nbGood: number;
    nbBad: number;
};


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const CardQuizv2 = (children: any) => {
    const option = "Test"
    const sessionUser = "1w7K30BqJFTR6rJLKdAP9aasoKM2"

    const [shuffled, setShuffled] = useState([[]]); //Les réponses possibles mélangées 
    const [questions, setQuestions] = useState<Question[]>([]); //le Json des cartes montrées à l'user
    const [totalQuests, setTotalQuests] = useState(0);   //nb total de questions chargées
    const [noMoreCards, setNoMoreCards] = useState(true);   //S'il n'y a plus de carte à montrer

    const [submitted, setSubmitted] = useState(false);  //Si la réponse a déjà été submit au serveur
    const [answerCorrect, setAnswerCorrect] = useState(false);  // Si la réponse est correct ou non

    const [flip, setFlip] = useState(false);    //Tourner la carte
    const [plusButton, setPlusButton] = useState(false);    //Ouvrir les options
    const [checkboxes, setCheckboxes] = useState(true);    //Afficher le QCM
    const [isChecked, setIsChecked] = React.useState<string[]>([])  //Options cochées
    const [inputText, setInputText] = useState(""); //La réponse que l'user a écrit

    const [number, setNumber] = useState(0);    //Numéro de la carte
    const [indiceOpened, setIndiceOpened] = useState(false);    //Savoir si l'indice a été ouvert

    const [isExam, setIsExam] = useState(false);
    const [isLongTerme, setIsLongTerme] = useState(false);


    //SNACKBAR
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    //SNACKBAR


    // Quand children est chargé, lancer le quiz (i.e. au chargement du composant)
    useEffect(() => {
        startQuiz();
        setIsExam((children.children[3]));
        setIsLongTerme(children.children[4]);
        handleClick()
    }, [children]);

    //Quand isChecked est actualisé, le réactualiser 
    //(fix bug pour upload la réponse avec le flip ?)
    useEffect(() => {
        setIsChecked(isChecked);
    }, [isChecked]);

    useEffect(() => {
        setAnswerCorrect(answerCorrect);
    }, [answerCorrect]);

    useEffect(() => {
        if (totalQuests - number == 5 && !isLongTerme) {
            fetchMore()
        };
    }, [number]);


    //Initialisation
    const startQuiz = async () => {
        setAnswerCorrect(false);
        setNoMoreCards(false);
        setFlip(false);
        setSubmitted(false);
        setAnswerCorrect(false);
        setIsChecked([]);
        setNumber(0);
        setTotalQuests(children.children[0].length);
        setQuestions(children.children[0]);
        setShuffled(children.children[1]);
        if (children.children[0].length == 0) {
            setNoMoreCards(true)
        }

    }

    //Ouvir le bouton +
    const switchPlusButton = () => {
        setPlusButton(!plusButton);
    }

    // true = Afficher le QCM / false l'input
    const switchCheckboxes = () => {
        if (!submitted) {
            setCheckboxes(!checkboxes);
        }

    }

    //Upload la réponse de l'user
    const postAnswer = (isCorrect: boolean) => {
        const date = new Date();
        var answer = null;
        if (checkboxes) {
            answer = isChecked
        } else {
            answer = inputText
        }
        const opts = {
            status: isCorrect,
            date: date,
            answerInputted: JSON.stringify({ "answerInputted": answer }),
            fk_card: questions[number].id,
            fk_user: sessionUser,
            indiceOpened: indiceOpened,
            qcmOpened: checkboxes
        };

        const postdata = fetch("http://localhost:3000/api/answers_cards/create", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(opts)
        });
    }

    //Tourner la carte, conditions si c'est la 1ère fois pour ne pas upload 2fois, 
    //calcul de si la réponse est bonne
    const submitFlip = () => {
        setFlip(!flip);
        if (!submitted) {
            var isCorrect = false;
            if (checkboxes) {
                const answer = questions[number].answer;
                answer.sort();
                const isCheckedSorted = isChecked.sort();

                if (JSON.stringify(answer) === JSON.stringify(isCheckedSorted)) {
                    setAnswerCorrect(true);
                    isCorrect = true
                }
            } else {
                const levenshteinDist = (levenshtein(String(inputText).toUpperCase(), String(questions[number].answer).toUpperCase()))
                if (levenshteinDist < String(inputText).length / 3) {
                    setAnswerCorrect(true);
                    isCorrect = true
                } else { setAnswerCorrect(false) }
            }
            setSubmitted(true);
            setTimeout(() => {
                postAnswer(isCorrect);
            }, 800)
        }
    }

    //Réinitialisation, passage à la question suivante
    const nextQuestion = () => {
        // Move on to the next question if not the last question

        setFlip(false);
        setIsChecked([]);
        setFlip(false);
        setSubmitted(false);
        setAnswerCorrect(false);
        setInputText("");
        setIndiceOpened(false);
        if (!noMoreCards) {
            const nextQ = number + 1;
            setNumber(nextQ);
            if (questions[number].streak > 3 && questions[number].streakct > 3) {
                setCheckboxes(false);
            } else { setCheckboxes(true) }

        }

        if (number + 1 === totalQuests) {
            setNoMoreCards(true);
        } else {
            setNumber(number + 1);
        }
    };


    // A FAIRE
    const prevQuestion = () => {
        // Move on to the next question if not the last question

        setFlip(false);
        setIsChecked([]);
        setFlip(false);
        setSubmitted(true);
        setAnswerCorrect(false);
        setInputText("");
        setIndiceOpened(false);
        if (number != 0) {
            const nextQ = number - 1;
            setNumber(nextQ);
            if (questions[number].streak > 3 && questions[number].streakct > 3) {
                setCheckboxes(false);
            } else { setCheckboxes(true) }

        }

        if (number - 1 === -1) {

        } else {
            setNumber(number - 1);
        }
    };

    //Gérer un checkbox check
    const handleSingleCheck = (e: any) => {
        if (!submitted) {
            const option = e.target.getAttribute('value');;
            if (isChecked.includes(option)) {
                setIsChecked(isChecked.filter(checked_option => checked_option !== option))
            }
            else {
                isChecked.push(option);
                setIsChecked([...isChecked]);
            }
        }

    }

    //Permettre à l'user de charger plus de questions. 
    //Recalcul des scores avec les cartes jouées + import des nouvelles

    //Répétition de code ! Un cas si c'est un examen, un cas si ça n'est pas un examen
    //La différence ? l'api utilisée pour fetch les données
    //Mais pour ne pas avoir de pb de synchro j'ai carrément dupliqué tout le bloc
    const fetchMore = async () => {

        const slug = children.children[2].id;
        const opts = {
            fk_deck: slug,
            fk_user: sessionUser,
            isLongTerme: isLongTerme
        };

        if (!isExam) {
            const setscoreurl = `http://localhost:3000/api/cards_users/updateScore`
            const getCardsurl = `http://localhost:3000/api/cards_stacks/${slug}`
            const setScores = await fetch(setscoreurl, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(opts)
            });

            const cardsByIds = await fetch(getCardsurl, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(opts)
            });
            const cardsData = await cardsByIds.json();
            const len = cardsData.length;

            var d = []
            var newshuffled: any[] = []
            for (var i = 0; i < len; i++) {
                d = (cardsData[i].bad_options.concat(cardsData[i].answer));
                newshuffled.push(shuffle(d))
                d = []
            }

            const appended = questions.concat(cardsData)
            setQuestions(appended)

            const appendedShuffled = shuffled.concat(newshuffled) //Erreur signalée mais fonctionne très bien
            setTotalQuests(appended.length)
            setShuffled(appendedShuffled);
            setNoMoreCards(false);

        } else {
            const setscoreurl = `http://localhost:3000/api/exams/updateScore`
            const getCardsurl = `http://localhost:3000/api/exams/getMoreCards`
            const setScores = await fetch(setscoreurl, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(opts)
            });

            const cardsByIds = await fetch(getCardsurl, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(opts)
            });

            const cardsData = await cardsByIds.json();
            const len = cardsData.length;

            var d = []
            var newshuffled = []
            for (var i = 0; i < len; i++) {
                d = (cardsData[i].bad_options.concat(cardsData[i].answer));
                newshuffled.push(shuffle(d))
                d = []
            }

            const appended = questions.concat(cardsData)
            setQuestions(appended)

            const appendedShuffled = shuffled.concat(newshuffled) //Erreur signalée mais fonctionne très bien
            setTotalQuests(appended.length)
            setShuffled(appendedShuffled);
            setNoMoreCards(false);
        }

    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    const handleClickClueOpen = () => {
        setOpenClue(true);
    };

    const handleCloseClue = () => {
        setOpenClue(false);
    };

    const [openClue, setOpenClue] = React.useState(false);


    return (

        <div className={styles.cardAroundSettings}>

            {/* Ne charger que si la question est chargée */}
            {children.children ?
                <>
                    {!noMoreCards ?

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            {/* <div className={styles.nextCardButton}>
                                <IconButton aria-label="grid" onClick={prevQuestion}>
                                    <NavigateBackIcon fontSize="small" />
                                </IconButton>
                            </div> */}
                            <div className="wrapper">
                                <IconButton aria-label="delete">
                                    <NavigateBeforeIcon />
                                </IconButton>
                            </div>

                            <div className={flip ? styles.flipme : ""}>
                                <div className={styles.wrapperCard}>
                                    <div className={styles.carda} >
                                        <div className={styles.cardaface}>
                                            <h1 style={{ margin: '10px 5px 20px 5px' }}>Quel est la capital de la France ?</h1>
                                            <img src="/pinguin.jpg" object-fit="contain" style={{ height: '20vh', margin: '-15px 0 0 0' }} className="item" />
                                            <div className="wrapper" style={{ marginTop: '15px' }}>
                                                <div style={{ flex: '1' }}>
                                                    <Card style={{ marginTop: '8px', marginLeft: '20px', backgroundColor: 'rgb(230, 230, 255)', maxWidth: '250px' }}>
                                                        <p style={{ margin: '10px', color: 'black' }}>1 bonne réponse sélectionnée</p>
                                                    </Card>
                                                </div>
                                                <div style={{ flex: '1', float: 'right', textAlign: 'right' }}>
                                                    <IconButton aria-label="indice" onClick={handleClickClueOpen}>
                                                        <EmojiObjectsIcon style={{ height: '35px', width: '35px', color: 'orange' }} />
                                                    </IconButton>
                                                    <Dialog open={openClue} onClose={handleCloseClue} aria-labelledby="form-dialog-title">
                                                        <DialogTitle id="form-dialog-title">Indice</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                C'est au milieu de la france...
                                        </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleCloseClue} color="primary">
                                                                Fermer
                                         </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                    <IconButton aria-label="more" onClick={handleClickMenu}>
                                                        <DehazeIcon style={{ height: '35px', width: '35px' }} />
                                                    </IconButton>
                                                    <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleCloseMenu}
                                                    >
                                                        <MenuItem onClick={handleCloseMenu}>
                                                            <ListItemIcon>
                                                                <FileCopyIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Dupliquer la carte" />
                                                        </MenuItem>
                                                        <MenuItem onClick={handleCloseMenu}>
                                                            <ListItemIcon>
                                                                <FindInPageIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Prévisualisation" />
                                                        </MenuItem>
                                                        <MenuItem onClick={handleCloseMenu} style={{ backgroundColor: 'red' }}>
                                                            <ListItemIcon>
                                                                <DeleteSweepIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Supprimer la carte" />
                                                        </MenuItem>
                                                    </Menu>
                                                </div>
                                            </div>
                                            <div className="wrapper" style={{ margin: '20px 10px 0 10px' }}>
                                                <Card elevation={3} style={{ flex: '1 0 35%', minWidth: '200px', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible', backgroundColor: 'rgb(245, 245, 245)' }}>
                                                    <div className="wrapper">
                                                        <div style={{ float: 'left', width: '80%' }}>
                                                            <InputBase
                                                                placeholder='Réponse 1'
                                                                multiline
                                                                style={{ width: '100%', float: 'left', margin: '3px 0 0 15px' }}
                                                                value="Marseille"
                                                            />
                                                        </div>
                                                        <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', float: 'right' }}>
                                                            <Checkbox
                                                                defaultChecked
                                                                color="primary"
                                                                style={{ float: 'right' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Card>
                                                <Card elevation={3} style={{ flex: '1 0 35%', minWidth: '200px', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible', backgroundColor: 'rgb(245, 245, 245)' }}>
                                                    <div className="wrapper">
                                                        <div style={{ float: 'left', width: '80%' }}>
                                                            <InputBase
                                                                placeholder='Réponse 1'
                                                                multiline
                                                                style={{ width: '100%', float: 'left', margin: '3px 0 0 15px' }}
                                                                value="Lyon"
                                                            />
                                                        </div>
                                                        <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', float: 'right' }}>
                                                            <Checkbox
                                                                defaultChecked
                                                                color="primary"
                                                                style={{ float: 'right' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Card>
                                                <Card elevation={3} style={{ flex: '1 0 35%', minWidth: '200px', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible', backgroundColor: 'rgb(220, 255, 220)' }}>
                                                    <div className="wrapper">
                                                        <div style={{ float: 'left', width: '80%' }}>
                                                            <InputBase
                                                                placeholder='Réponse 1'
                                                                multiline
                                                                style={{ width: '100%', float: 'left', margin: '3px 0 0 15px' }}
                                                                value="Paris"
                                                            />
                                                        </div>
                                                        <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', float: 'right' }}>
                                                            <Checkbox
                                                                defaultChecked
                                                                color="primary"
                                                                style={{ float: 'right' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>

                                        </div>
                                        <div className={`${styles.cardaback}`} style={{backgroundColor:'rgb(220, 255, 220)'}}>
                                            {/* <div style={{width:'100%', height:'50px', backgroundColor:'red'}} ></div> */}
                                            <h1 style={{ margin: '10px 5px 20px 5px' }}>Quel est la capital de la France ?</h1>
                                            <img src="/pinguin.jpg" object-fit="contain" style={{ height: '20vh', margin: '-15px 0 0 0' }} className="item" />
                                            <div className="wrapper" style={{ marginTop: '15px' }}>
                                                <div style={{ flex: '1' }}>
                                                    {/* <Card style={{ marginTop: '8px', marginLeft: '20px', backgroundColor: 'red', maxWidth: '250px' }}>
                                                        <p style={{ margin: '10px', color: 'white' }}>Raté vous ferez mieux la prochaine fois ;)</p>
                                                    </Card> */}
                                                    {/* <Card style={{ marginTop: '8px', marginLeft: '20px', maxWidth: '250px' }}>
                                                        <p style={{ margin: '10px', color: 'black' }}>Bien joué vous avez la bonne réponse</p>
                                                    </Card> */}
                                                    {/* <Typography>Bravo</Typography> */}
                                                </div>
                                                <div style={{ flex: '1', float: 'right', textAlign: 'right' }}>
                                                    <IconButton aria-label="indice" onClick={handleClickClueOpen}>
                                                        <EmojiObjectsIcon style={{ height: '35px', width: '35px', color: 'orange' }} />
                                                    </IconButton>
                                                    <Dialog open={openClue} onClose={handleCloseClue} aria-labelledby="form-dialog-title">
                                                        <DialogTitle id="form-dialog-title">Indice</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                C'est au milieu de la france...
                                        </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleCloseClue} color="primary">
                                                                Fermer
                                         </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                    <IconButton aria-label="more" onClick={handleClickMenu}>
                                                        <DehazeIcon style={{ height: '35px', width: '35px' }} />
                                                    </IconButton>
                                                    <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleCloseMenu}
                                                    >
                                                        <MenuItem onClick={handleCloseMenu}>
                                                            <ListItemIcon>
                                                                <FileCopyIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Dupliquer la carte" />
                                                        </MenuItem>
                                                        <MenuItem onClick={handleCloseMenu}>
                                                            <ListItemIcon>
                                                                <FindInPageIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Prévisualisation" />
                                                        </MenuItem>
                                                        <MenuItem onClick={handleCloseMenu} style={{ backgroundColor: 'red' }}>
                                                            <ListItemIcon>
                                                                <DeleteSweepIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Supprimer la carte" />
                                                        </MenuItem>
                                                    </Menu>
                                                </div>
                                            </div>
                                            <div className="wrapper" style={{ margin: '20px 10px 0 10px' }}>
                                                <Card elevation={3} style={{ flex: '1 0 35%', minWidth: '200px', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible', backgroundColor: 'rgb(255, 160, 160)' }}>
                                                    <div className="wrapper">
                                                        <div style={{ float: 'left', width: '80%' }}>
                                                            <InputBase
                                                                placeholder='Réponse 1'
                                                                multiline
                                                                style={{ width: '100%', float: 'left', margin: '3px 0 0 15px' }}
                                                                // value="Marseille"
                                                            />
                                                        </div>
                                                        <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', float: 'right' }}>
                                                            <Checkbox
                                                                checked={false}
                                                                color="primary"
                                                                style={{ float: 'right' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Card>
                                                <Card elevation={3} style={{ flex: '1 0 35%', minWidth: '200px', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible', backgroundColor: 'rgb(255, 160, 160)' }}>
                                                    <div className="wrapper">
                                                        <div style={{ float: 'left', width: '80%' }}>
                                                            <InputBase
                                                                placeholder='Réponse 1'
                                                                multiline
                                                                style={{ width: '100%', float: 'left', margin: '3px 0 0 15px' }}
                                                                value="Lyon"
                                                            />
                                                        </div>
                                                        <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', float: 'right' }}>
                                                            <Checkbox
                                                                checked={true}
                                                                color="primary"
                                                                style={{ float: 'right' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Card>
                                                <Card elevation={3} style={{ flex: '1 0 35%', minWidth: '200px', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible', backgroundColor: 'rgb(87, 206, 8)' }}>
                                                    <div className="wrapper">
                                                        <div style={{ float: 'left', width: '80%' }}>
                                                            <InputBase
                                                                placeholder='Réponse 1'
                                                                multiline
                                                                style={{ width: '100%', float: 'left', margin: '3px 0 0 15px' }}
                                                                value="Paris"
                                                            />
                                                        </div>
                                                        <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', float: 'right' }}>
                                                            <Checkbox
                                                                checked={true}
                                                                color="primary"
                                                                style={{ float: 'right' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>
                                            <h2>Bonne réponse !</h2>
                                            <DoneOutlineIcon/>
                                            <button className={styles.btnCardBack} onClick={submitFlip}>Retourner</button>
                                        </div>
                                        <button className={styles.btnCard} onClick={submitFlip}>Retourner</button>
                                    </div>
                                </div>

                            </div>
                            {/* <div className = {styles.sideButtons}>
                    {checkboxes?
                    <IconButton aria-label="grid" onClick = {switchCheckboxes}>
                        <TextFieldsIcon fontSize="small"/>
                    </IconButton>
                    : 
                    <IconButton aria-label="grid" onClick = {switchCheckboxes}>
                        <FormatListBulletedIcon fontSize="small"/>
                    </IconButton>
                    }
                    <div onClick = {()=>setIndiceOpened(true)}>
                        <Indice > {questions[number].tip} </Indice>
                    </div>

                    <IconButton aria-label="grid"  onClick = {switchPlusButton} >
                        <AddIcon fontSize="small"/>
                    </IconButton>

                    {plusButton?
                    <>
                    <IconButton aria-label="grid" >
                        <PlaylistAddIcon fontSize="small"/>
                    </IconButton>
                    <IconButton aria-label="grid" >
                        <ReportIcon fontSize="small"/>
                    </IconButton>
                    <IconButton aria-label="grid" >
                        <CreateIcon fontSize="small"/>
                    </IconButton>
                    </>            
                    :null
                    
                    }
                </div> */}
                            {/* <div className={styles.nextCardButton}>
                                <IconButton aria-label="grid" onClick={nextQuestion}>
                                    <NavigateNextIcon fontSize="small" />
                                </IconButton>
                            </div> */}
                            <div className="wrapper">
                                <IconButton aria-label="delete">
                                    <NavigateNextIcon />
                                </IconButton>
                            </div>
                        </div> :
                        <div className={styles.carda}>
                            <div className={styles.cardaface}>
                                {isExam ?
                                    <>
                                        <div className={styles.descriptionCard}>Séance de révision terminée !</div>
                                        <div className={styles.descriptionCard}>Vous avez fini les cartes que vous deviez revoir aujourd'hui !</div>

                                        <div>
                                            <FutureSeance>
                                                {children.children[2]}
                                            </FutureSeance>
                                        </div>

                                        <div className={styles.descriptionCard}>Si vous le souhaitez vous pouvez toujours continuer pour prendre de l'avance</div>
                                    </>
                                    :
                                    <div className={styles.descriptionCard}>Charger plus de cartes ?</div>
                                }



                            </div>
                            <button className={styles.btnCardBack} onClick={fetchMore}>Continuer</button>

                            <div className={styles.sideButtons}>
                                <IconButton aria-label="grid" onClick={startQuiz}>
                                    <ReplayIcon fontSize="small" />
                                </IconButton>
                            </div>
                        </div>
                    }
                </>
                : <div>Loading...</div>}

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Cartes chargées!
        </Alert>
            </Snackbar>

        </div>
    )
}
export default CardQuizv2

export const shuffle = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);


function levenshtein(a: String, b: String) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
}