import { Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SettingsIcon from '@material-ui/icons/Settings';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ChipInput from 'material-ui-chip-input';
import Dropzone from '../../pages/components/Dropzone'
import { AnyNaptrRecord } from "dns";
import ModalUnsplash from '../components/ModalUnsplash'

import { useRouter } from 'next/router'

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

export default function ModalCreateDeck(sessionUser:any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let tags = ['']
  const [tagsArray, setTags] = React.useState(tags);

  const [description, setDescriptionHook] = React.useState('');
  const [imageurl, setImageurl] = React.useState('');
  const [privacy, setPrivacy] = React.useState(false);

  const handleAddChip = (chip:any) =>{
    let tempTags = [...tagsArray];
    tempTags.push(chip)
    setTags(tempTags)
}

const handleDeleteChip = (chip:any, index:any) =>{
    let tempTags = [...tagsArray];
    tempTags.splice(index,1);
    setTags(tempTags)
}
  const handleOpen = () => {
    setOpen(true);
  };
  function setTitle(val:any){
    let tempTitle = JSON.parse(JSON.stringify(newDeckName));
    tempTitle = val;
    setNewDeckName(tempTitle);
  }

  const handleClose = () => {
    setOpen(false);
  };

  function setDescription(val:any){
    let tempTitle = JSON.parse(JSON.stringify(description));
    tempTitle = val;
    setDescriptionHook(tempTitle);
  }

  const [newDeckName, setNewDeckName] = useState("");
  const [router,setRouter] = useState(useRouter());

  async function submitNewDeck(){
    const upload = await fetch(`http://localhost:3000/api/decks/create`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({title : newDeckName, fk_user : sessionUser.children, imageurl:imageurl, description:description, private:privacy}),
          }).then(res => res.json()).then( res=> redirectTo(res.uuidstack) );
          
  }
  
  const redirectTo = (uuidstack:any)=>{
    router.push(`/decks/edit/${uuidstack}`);
  }

  const toggleDeckPrivacy = () => {
    let tempTitle = JSON.parse(JSON.stringify(privacy));
    tempTitle = !tempTitle;
    setPrivacy(tempTitle);
    }

    const callbackImageUrl = (url:string) =>{
      let tempTitle = JSON.parse(JSON.stringify(imageurl));
      tempTitle = url;
      setImageurl(tempTitle);
    }
  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Create new Deck
      </button>
    {/* <IconButton aria-label="delete" style={{ float: 'right', color: 'black', marginTop: '0px', height: '35px' }} onClick={handleClickOpen} >
        <SettingsIcon />
    </IconButton> */}
    <Dialog maxWidth='xl' open={open} onClose={handleClose} aria-labelledby="form-dialog-title" PaperProps={{ style: { borderRadius: 10 } }}>
        <DialogContent style={{ padding: '0px', height: '80%', backgroundColor: 'rgb(227, 230, 255)' }}>
            {/* Ecrire ici le html */}
            <Dropzone></Dropzone>
            <div>
                {
                  imageurl.length > 5 ?
                    <img src={imageurl}  style={{ minWidth: '320px', width: '60vh', maxHeight: '200px', objectFit: 'cover' }} />
                      :
                    <img src="/montagne.jpg" style={{ minWidth: '320px', width: '60vh', maxHeight: '200px', objectFit: 'cover' }} />
                }
                               
            </div>

            <div className="wrapper" style={{ margin: '-40px 0 0 0' }}>
                    <div style={{ flex: '1' }}>
                    <ModalUnsplash>{{"id":"0"}}{callbackImageUrl}{false}</ModalUnsplash>
                    </div>
                    </div>
            <div style={{ width: '80%', margin: 'auto', maxWidth: '60vh' }}>
                <Card elevation={5} style={{ width: '100%', margin: 'auto', marginTop: '20px' }}>
                    <TextField
                        inputProps={{ min: 0, style: { textAlign: 'center' } }}
                        placeholder="Titre du deck"
                        variant="outlined"
                        style={{ width: '100%', height: '100%' }}
                        value={newDeckName}
                        onChange={(e) => setTitle(e.target.value)}
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
                        }}
                        value={tagsArray}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip, index) => handleDeleteChip(chip, index)}
                        >
                           
                        </ChipInput>
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Card>
                <div className="wrapper" style={{ width: '100%', marginTop: '15px' }}>
                    <div style={{ flex: '1', float: 'right', textAlign: 'right' }}>
                        <Typography style={{ fontSize: '18px', marginTop: '4px' }}>
                            
                            Public
                            
                            </Typography>
                    </div>
                    <div style={{ flex: '1', float: 'left', textAlign: 'left' }}>
                        <Switch
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            checked={privacy} 
                            onChange={toggleDeckPrivacy} 
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
            <Button onClick={submitNewDeck} color="primary">
                Créer
        </Button>
        </DialogActions>
    </Dialog>
</div>
  );
}
