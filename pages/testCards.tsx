import { CardContent, Card, InputBase, Button, Box, Divider, TextareaAutosize, TextField, Checkbox, Icon, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { IconButton, Paper } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { borders } from '@material-ui/system';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import DehazeIcon from '@material-ui/icons/Dehaze';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SaveIcon from '@material-ui/icons/Save';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import PopEditDeckInfo from './components/PopEditDeckInfo';

import React from 'react';
export default function test() {

    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickClueOpen = () => {
        setOpen(true);
    };

    const handleCloseClue = () => {
        setOpen(false);
    };

    return (
        <div className="wrapperHidden" >
            <div className="mydiv-leftCard">
                <div className="mydiv-deckTitle" >
                    <div className="wrapper" >
                        <div className="mydiv-1left">
                            <div className="wrapper">
                                <div style={{ flex: '1' }}>
                                    <h3 style={{ marginLeft: '7px', color: 'black', textAlign: 'left' }}>Titre du deck</h3>
                                </div>
                                <div style={{ width: '50px' }}>
                                    <PopEditDeckInfo/>
                                </div>
                            </div>
                        </div>
                        <div className="mydiv-222">
                            <img src="/pinguin.jpg" object-fit="contain" style={{ height: '50px', margin: '5px', float: 'right' }} />
                        </div>
                    </div>

                </div>
                <div>
                    <Paper elevation={10} variant="outlined" style={{ height: '45px', borderColor: 'black', borderRadius: '5px' }}>
                        <InputBase
                            placeholder="Rechercher une carte"
                            style={{ margin: '7px 0 0 10px', width: '80%' }}
                        />
                        <IconButton type="submit" aria-label="search" style={{ float: 'right', textAlign: 'right' }}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
                <div className="divCardLeft">
                    <Button style={{margin:'0px', padding:'0px'}}>
                    <Card style={{ float: 'left', width: '98%', margin: '1%', maxHeight: "100px", border: "1px solid" }}>
                        <div className="wrapper">
                            <div className="mydiv-11">
                                <p style={{ fontWeight: 'bold', padding: '6px' }}>1: Quel est la capital de la France ?</p>
                            </div>
                            <div className="mydiv-222">
                                <img src="/pinguin.jpg" object-fit="contain" style={{ height: '100px', margin: '-16px -16px 0 0', float: 'right' }} />
                            </div>
                        </div>
                    </Card>
                    </Button>
                </div>
                <Card style={{ float: 'left', width: '415px', maxHeight: "100px", position: 'fixed', bottom: '0px', left: '0px', margin: '5px', backgroundColor: 'blue' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ height: '75px', width: '100%' }}
                    >
                        <h3>Ajouter une nouvelle carte</h3>

                    </Button>
                </Card>


            </div>
            <div className="mydiv-rightCard" style={{ height: 'calc(100vh - 64px)' }} >
                <Card elevation={7} style={{ width: '80%', margin: '0 auto', marginTop: '30px', paddingBottom: '20px', overflowY: 'scroll', maxHeight: 'calc(100vh - 130px)', maxWidth: '800px' }}>

                    <img src="/pinguin.jpg" object-fit="contain" style={{ height: '100px', margin: '20px 0 0 0' }} />
                    {/* <p style={{ margin: '10px 0 0 0' }}>Déposez une image de votre ordinateur ici</p> */}
                    <div className="wrapper" style={{ margin: '10px 0 0 0' }}>
                        <div style={{ flex: '1' }}>
                            <Button variant="contained">Librairie d'images</Button>
                        </div>
                        <div style={{ flex: '1' }}>
                            <Button variant="contained">Téléverser une image</Button>
                        </div>
                    </div>
                    <Divider style={{ margin: '20px 0 0 0', height: '2px', background: 'black' }} />
                    <div style={{ width: '80%', margin: '0 auto', marginTop: '20px', paddingBottom: '20px' }}>
                        <Card elevation={5} style={{ width: '100%', height: '110px' }}>
                            <TextField
                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                placeholder="Écrivez ici votre question"
                                multiline
                                variant="outlined"
                                rows={4}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </Card>
                        <div className="wrapper" style={{ marginTop: '15px' }}>
                            <div style={{ flex: '1' }}>
                                <Card style={{ marginTop: '8px', backgroundColor: 'blue' }}>
                                    <p style={{ margin: '10px', color: 'white' }}>1 bonne réponse sélectionnée</p>
                                </Card>
                            </div>
                            <div style={{ flex: '1', float: 'right', textAlign: 'right' }}>
                                <IconButton aria-label="indice" onClick={handleClickClueOpen}>
                                    <EmojiObjectsIcon style={{ height: '35px', width: '35px', color: 'orange' }} />
                                </IconButton>
                                <Dialog open={open} onClose={handleCloseClue} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Indice</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Vous pouvez ajouter un indice à votre carte qui sera disponible sur demande.
                                        </DialogContentText>
                                        <Card elevation={5} style={{ width: '100%', height: '110px' }}>
                                            <TextField
                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                placeholder="Écrivez ici l'indice de votre carte"
                                                multiline
                                                variant="outlined"
                                                rows={4}
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </Card>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseClue} color="primary">
                                            Annuler
                                         </Button>
                                        <Button onClick={handleCloseClue} color="primary">
                                            Sauvegarder
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
                        <div className="wrapper" style={{ margin: '0 -10px 0 -10px' }}>
                            <Card elevation={3} style={{ flex: '1 0 35%', minWidth: '250px', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible', backgroundColor: 'rgb(220, 255, 220)' }}>
                                <IconButton aria-label="indice" style={{ height: '5px', width: '5px', top: '-10px', left: '-10px', position: 'absolute' }}>
                                    <CancelIcon style={{ height: '17px', width: '17px', color: 'red' }} />
                                </IconButton>
                                <div className="wrapper">
                                    <div style={{ float: 'left', width: '80%' }}>
                                        <InputBase
                                            placeholder='Réponse 1'
                                            multiline
                                            style={{ width: '100%', float: 'left', margin: '3px 0 0 15px' }}
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
                            <Card elevation={3} style={{ flex: '1 0 35%', minWidth: '250px', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ width: '100%', height: '100%' }}
                                    endIcon={<AddCircleOutlineIcon />}
                                >
                                    Ajouter une réponse
                                </Button>
                            </Card>
                        </div>
                    </div >
                    <Button
                        variant="contained"
                        style={{ backgroundColor: 'green', color: 'white', marginTop: '20px' }}
                        endIcon={<SaveIcon />}
                    >
                        Enregistrer la carte
                                </Button>
                </Card>
            </div>
        </div>
    )
}