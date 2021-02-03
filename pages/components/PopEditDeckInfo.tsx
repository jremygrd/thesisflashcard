import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@material-ui/core";
import React from "react";
import SettingsIcon from '@material-ui/icons/Settings';



export default function popDeckInfo() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <IconButton aria-label="delete" style={{ float: 'right', color: 'black', marginTop: '6px' }} onClick={handleClickOpen} >
                <SettingsIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    {/* Ecrire ici le html */}
                    <h1>Test Titre</h1>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                </Button>
                    <Button onClick={handleClose} color="primary">
                        Sauvegarder
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}