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
    }),
);

export default function PopMail() {

    const [open, setOpen] = React.useState(false);
    const [openSucces, setOpenSucces] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
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

    return (
        <body>
            <IconButton aria-label="share" onClick={handleClickOpen}>
                <ShareIcon />
            </IconButton>
            {/* Pop up to change mail adress */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Partager mon deck</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vous pouvez rendre votre deck publique, tout le monde pour télécharger votre deck et vous pourrez le partager via un lien.
          </DialogContentText>
                    <div className="wrapper">
                        <p style={{ margin: '10px 0px 0px 0px' }}>Deck privé : </p>
                        <Switch
                            name="SwitchPublic"

                        />
                    </div>
                    <p>Votre deck est privé vous ne pouvez donc pas le partager. Pour ce faire rendez votre deck publique et vous pourrez le partager via un lien. </p>
                    <Card style={{backgroundColor:"#f4edff"}} >
                        <CardContent>
                            <div className="wrapper" >
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value="htpp/rverve/crevre.com"
                                    style={{flex:"8"}}
                                />
                                <IconButton aria-label="copy" style={{flex:"1"}}>
                                    <FileCopyIcon />
                                </IconButton>
                            </div>

                        </CardContent>
                    </Card>
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