import { CardContent, Card, InputBase, Button, Box, Divider, TextareaAutosize, TextField, Checkbox, Icon, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, DialogProps, Slide, AppBar, Toolbar, Typography } from '@material-ui/core';
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
import CloseIcon from '@material-ui/icons/Close';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import PopEditDeckInfo from './components/PopEditDeckInfo';

import React from 'react';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

    const [openClue, setOpenClue] = React.useState(false);
    const [openSearch, setOpenSearch] = React.useState(false);

    const handleClickClueOpen = () => {
        setOpenClue(true);
    };

    const handleCloseClue = () => {
        setOpenClue(false);
    };

    const handleClickSearchOpen = () => {
        setOpenSearch(true);
    };

    const handleCloseSearch = () => {
        setOpenSearch(false);
    };

    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');



    return (
        <div className="wrapperHidden" >
            <div className="mydiv-rightCard" style={{ height: 'calc(100vh - 64px)' }} >
                <Card elevation={7} style={{ width: '95%', margin: '0 auto', marginTop: '15px', paddingBottom: '20px', overflowY: 'scroll', maxHeight: 'calc(100vh - 230px)', maxWidth: '800px', borderRadius: '20px' }}>

                    <img src="/pinguin.jpg" style={{ height: '100px', margin: '20px 0 0 0', objectFit: 'contain' }} />
                    {/* <p style={{ margin: '10px 0 0 0' }}>Déposez une image de votre ordinateur ici</p> */}
                    <div className="wrapper" style={{ margin: '10px 0 0 0' }}>
                        <div style={{ flex: '1', margin: '0 5px 0 10px' }}>
                            <Button variant="contained">Librairie d'images</Button>
                        </div>
                        <div style={{ flex: '1', margin: '0 10px 0 5px' }}>
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
                                <Card style={{ marginTop: '8px', backgroundColor: 'blue', maxHeight: '50px', overflow: 'scroll' }}>
                                    <p style={{ margin: '10px', color: 'white' }}>1 bonne réponse sélectionnée</p>
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
                            <Card elevation={3} style={{ flex: '1 0 60%', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible', backgroundColor: 'rgb(220, 255, 220)' }}>
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
                            <Card elevation={3} style={{ flex: '1 0 60%', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible' }}>
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
                <div style={{ float: 'left', width: '100%', height: '35px', maxHeight: "35px", position: 'fixed', bottom: '100px', left: '0px', margin: '0px', backgroundColor: 'rgb(192, 197, 255)' }}>
                    <div className="wrapper">
                        <div style={{ width: '50px', float: 'left' }}>
                            <PopEditDeckInfo />
                        </div>
                        <div style={{ width: 'calc(100% - 100px)', float: 'left', textAlign: 'left' }}>
                            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Titre du deck</p>
                        </div>
                        <div style={{ width: '50px', float: 'right' }}>
                            <IconButton aria-label="search" style={{ float: 'right', color: 'black', marginTop: '0px', height: '35px' }} onClick={handleClickSearchOpen}>
                                <SearchIcon />
                            </IconButton>
                            <Dialog fullScreen open={openSearch} onClose={handleCloseSearch} TransitionComponent={Transition} >
                                <div style={{ height: '100%', backgroundColor: 'rgb(192, 197, 255)' }}>
                                    <AppBar>
                                        <Toolbar>
                                            <IconButton edge="start" color="inherit" onClick={handleCloseSearch} aria-label="close">
                                                <CloseIcon />
                                            </IconButton>
                                            <Typography variant="h6" >
                                                Titre du deck
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                    <div style={{ margin: '70px 10px 0 10px' }}>
                                        <Paper elevation={10} variant="outlined" style={{ height: '45px', borderColor: 'black', borderRadius: '5px' }}>
                                            <InputBase
                                                placeholder="Rechercher une carte"
                                                style={{ margin: '7px 0 0 10px', width: '80%' }}
                                            />
                                            <IconButton type="submit" aria-label="search" style={{ float: 'right', textAlign: 'right' }}>
                                                <SearchIcon />
                                            </IconButton>
                                        </Paper>

                                        <Button style={{ margin: '0px', padding: '0px' }}>
                                            <Card style={{ float: 'left', width: '100%', maxHeight: "100px", border: "1px solid" }}>
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

                                    <Button style={{margin:'auto',padding:'0px', display:'flex', marginTop:'10px'}} onClick={handleCloseSearch} >Fermer</Button>
                                </div>

                            </Dialog>
                        </div>
                    </div>
                    <p>Titre du deck</p>
                </div>
                <div style={{ float: 'left', width: '100%', height: '100px', maxHeight: "100px", position: 'fixed', bottom: '0px', left: '0px', margin: '0px', backgroundColor: 'rgb(192, 197, 255)' }}>
                    <div className="wrapper">
                        <div style={{ width: '80%', float: 'left' }}>
                            <div style={{ display: 'flex', overflowX: 'auto' }}>
                                <Card elevation={3} style={{ width: '50%', maxWidth: '50%', minWidth: '50%', margin: '5px 0px 5px 5px', height: '90px' }}>
                                    <Button
                                        variant="contained"
                                        style={{ height: '100%', width: '100%', margin: '0px', padding: '0px' }}
                                    >
                                        <div className="wrapper" style={{ width: '100%', height: '100%' }}>
                                            <div style={{ float: 'left', width: '70%', overflow: 'hidden', height: '90px' }}>
                                                <p style={{ fontWeight: 'bold', textTransform: 'none', textAlign: 'left', padding: '3px' }}>1. Quelle est la capitale de la France?</p>
                                            </div>
                                            <div style={{ float: 'right', width: '30%', height: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <img src="/pinguin.jpg" style={{ maxHeight: '90px', minHeight: '90px', margin: 'auto', objectFit: 'cover' }} />
                                            </div>
                                        </div>

                                    </Button>
                                </Card>
                                <Card elevation={3} style={{ width: '50%', maxWidth: '50%', minWidth: '50%', margin: '5px 0px 5px 5px', height: '90px' }}>
                                    <Button
                                        variant="contained"
                                        style={{ height: '100%', width: '100%', margin: '0px', padding: '0px' }}
                                    >
                                        <div className="wrapper" style={{ width: '100%', height: '100%' }}>
                                            <div style={{ float: 'left', width: '70%', overflow: 'hidden', height: '90px' }}>
                                                <p style={{ fontWeight: 'bold', textTransform: 'none', textAlign: 'left', padding: '3px' }}>1. Quelle est la capitale de la France?</p>
                                            </div>
                                            <div style={{ float: 'right', width: '30%', height: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <img src="/pinguin.jpg" style={{ maxHeight: '90px', minHeight: '90px', margin: 'auto', objectFit: 'cover' }} />
                                            </div>
                                        </div>

                                    </Button>
                                </Card>
                                <Card elevation={3} style={{ width: '50%', maxWidth: '50%', minWidth: '50%', margin: '5px 0px 5px 5px', height: '90px' }}>
                                    <Button
                                        variant="contained"
                                        style={{ height: '100%', width: '100%', margin: '0px', padding: '0px' }}
                                    >
                                        <div className="wrapper" style={{ width: '100%', height: '100%' }}>
                                            <div style={{ float: 'left', width: '70%', overflow: 'hidden', height: '90px' }}>
                                                <p style={{ fontWeight: 'bold', textTransform: 'none', textAlign: 'left', padding: '3px' }}>1. Quelle est la capitale de la France?</p>
                                            </div>
                                            <div style={{ float: 'right', width: '30%', height: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <img src="/pinguin.jpg" style={{ maxHeight: '90px', minHeight: '90px', margin: 'auto', objectFit: 'cover' }} />
                                            </div>
                                        </div>

                                    </Button>
                                </Card>
                            </div>

                        </div>
                        <div style={{ width: '20%', float: 'right' }}>
                            <Card elevation={3} style={{ width: '95%', height: '100px', margin: 'auto', backgroundColor: 'rgb(192, 197, 255)' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ height: '90px', width: '50%', padding: '0px', margin: '5px 5px 5px 5px' }}
                                >
                                    <h3>+</h3>

                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}