import React, { useRef,useState } from 'react';
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
import { IconButton, OutlinedInput } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import Switch from '@material-ui/core/Switch';
import { FormControlLabel } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';


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
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            overflow:'scroll',
            height:"90%",
            width:"90%",
          },
    }),
);


const sessionUser = "1w7K30BqJFTR6rJLKdAP9aasoKM2"


export default function PopMail(deckData:any) {

    const [open, setOpen] = React.useState(false);
    const [openSucces, setOpenSucces] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [myerrorText, setMyerrorText] = useState('');
    const [privateDeck, setPrivateDeck] = React.useState(deckData.children.private);


    const toggleDeckPrivacy = async() => {
    const isPrivateNow = !privateDeck;
    setPrivateDeck(!privateDeck);
    const opts = { fk_deck: deckData.id, fk_user: sessionUser,private:isPrivateNow };
    const changeFavorite = await fetch(
      `http://localhost:3000/api/decks/changePrivacy`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
      }
    );

    
  };

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

    return (
        <body>
            <IconButton aria-label="share" onClick={handleClickOpen}>
                <ShareIcon />
            </IconButton>
            {/* Pop up to change mail adress */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                {sessionUser == deckData.children.fk_user ?
                    "Partager mon deck":"Partager ce deck"}
                    
                    </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    {
                    sessionUser == deckData.children.fk_user ?
                    <>
                        {
                            privateDeck?
                            "Votre deck est privé. Vous seul et les personnes qui l'ont déjà téléchargé pouvez l'utiliser"
                            :
                            "Votre deck est public. Vous pouvez le partager via le lien ci-dessous"
                      } </> 
                    :null}
                        
                    </DialogContentText>
                    {
                    sessionUser == deckData.children.fk_user ?
                    <div className="wrapper">
                        <p style={{ margin: '10px 0px 0px 0px' }}>
                        {
                        privateDeck?
                            "Deck privé  🔐": 
                            "Deck public 🔓"
                        }
                        </p>
                        <Switch
                            name="SwitchPublic"
                            checked={privateDeck} 
                            onChange={toggleDeckPrivacy} 
                        />
                    </div> :null}
                    <p>
                    {
                    sessionUser == deckData.children.fk_user ?
                        <>
                    {
                        privateDeck?
                        "Votre deck est privé et vous ne pouvez donc pas le partager. Rendez le public pour pouvoir le partager. "
                        :
                        "Partagez votre deck via le lien suivant :"
                    }</>:null
                        
                    }
                    </p>
                    {
                    privateDeck?null:
                   
                    <Card style={{backgroundColor:"#f4edff"}} >
                        <CardContent>
                            <div className="wrapper" >
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={`https://thesisflashcards/decks/details/${deckData.children.id}`}
                                    style={{flex:"8"}}
                                />
                                <IconButton aria-label="copy" style={{flex:"1"}}>
                                    <FileCopyIcon  
                                    onClick={()=>console.log("copy text pls")}
                                    />
                                </IconButton>
                            </div>

                        </CardContent>
                    </Card>
                     }
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
          </Button>
                    <Button
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
        </body>
    )
}