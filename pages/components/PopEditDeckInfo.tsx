import { Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from "@material-ui/core";
import React from "react";
import SettingsIcon from '@material-ui/icons/Settings';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ChipInput from 'material-ui-chip-input';
import Dropzone from '../../pages/components/Dropzone'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            fill: 'white',
            height: '50px',
            width: '30px',
            marginTop: '-15px',
        },
        chip: {
           backgroundColor:'blue',
           color:'white',
           margin: '0 5px 5px 0',
           float: 'left',
           icon:'red',
           height:'23px',
        },
    }),
);

export default function popDeckInfo(this: any) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();

    const handleDeleteChip = () => {
        console.info('You clicked the delete icon.');
    };

    function myChip() {

    }

    return (
        <div>
            <IconButton aria-label="delete" style={{ float: 'right', color: 'black', marginTop: '0px', height: '35px' }} onClick={handleClickOpen} >
                <SettingsIcon />
            </IconButton>
            <Dialog maxWidth='xl' open={open} onClose={handleClose} aria-labelledby="form-dialog-title" PaperProps={{ style: { borderRadius: 10 } }}>
                <DialogContent style={{ padding: '0px', height: '80%', backgroundColor: 'rgb(227, 230, 255)' }}>
                    {/* Ecrire ici le html */}
                    <Dropzone></Dropzone>
                    <div>
                        <img src="/montagne.jpg" style={{ minWidth: '320px', width: '60vh', maxHeight: '200px', objectFit: 'cover' }} />
                    </div>
                    <Button variant="contained" style={{width:'100%'}}>Librairie d'images</Button>
                    <div style={{ width: '80%', margin: 'auto', maxWidth: '60vh' }}>
                        <Card elevation={5} style={{ width: '100%', margin: 'auto', marginTop: '20px' }}>
                            <TextField
                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                placeholder="Titre du deck"
                                variant="outlined"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </Card>
                        <div className="wrapper" style={{ marginTop: '20px' }}>
                            <div style={{ flex: '4', textAlign: 'right' }}>
                                <Typography style={{ fontSize: '18px', marginTop: '2px' }}>Catégorie :</Typography>
                                <Typography style={{ fontSize: '18px', marginTop: '15px' }}>Étiquettes :</Typography>
                            </div>
                            <div style={{ flex: '6', maxWidth: '60%' }}>
                                <Select disableUnderline style={{ color: 'white', width: '80%', backgroundColor: 'blue', borderRadius: '8px', float: 'left', marginLeft: '15px' }} inputProps={{
                                    classes: {
                                        icon: classes.icon,
                                    },
                                }}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                                {/* div with all chip */}
                                {/* <div style={{ marginTop: '7px', marginLeft: '10px', float: 'left', textAlign: 'left' }}>
                                    <Chip label="nature" size="small" onDelete={handleDeleteChip} color="primary" style={{ marginTop: '5px', marginLeft: '5px' }} />
                                    <Chip label="matrinmoniale" size="small" onDelete={handleDeleteChip} color="primary" style={{ marginTop: '5px', marginLeft: '5px' }} />
                                    <Chip label="matrinmoniale" size="small" onDelete={handleDeleteChip} color="primary" style={{ marginTop: '5px', marginLeft: '5px' }} />
                                    <Chip label="Nouveau" icon={<AddIcon />} color="primary" size="small" clickable style={{marginTop: '5px', marginLeft: '5px'}} />
                                </div> */}
                                <ChipInput style={{marginTop:'15px', marginLeft:'10px'}} classes={{
                                    chip : classes.chip,
                                }}></ChipInput>
                            </div>
                        </div>
                        <Card elevation={5} style={{ width: '100%', height: '110px', marginTop: '15px' }}>
                            <TextField
                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                placeholder="Description"
                                multiline
                                variant="outlined"
                                rows={4}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </Card>
                        <div className="wrapper" style={{ width: '100%', marginTop: '15px' }}>
                            <div style={{ flex: '1', float: 'right', textAlign: 'right' }}>
                                <Typography style={{ fontSize: '18px', marginTop: '4px' }}>Publique :</Typography>
                            </div>
                            <div style={{ flex: '1', float: 'left', textAlign: 'left' }}>
                                <Switch
                                    name="checkedA"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </div>

                        </div>
                    </div>
                    {/* <h1>Test Titre</h1> */}
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