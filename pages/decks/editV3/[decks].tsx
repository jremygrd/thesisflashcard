import next, { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { CardContent, Card, InputBase, Button,
     Box, Divider, TextareaAutosize, TextField, Checkbox,
      Icon, Menu, MenuItem, ListItemIcon, ListItemText,
       Dialog, DialogTitle, DialogContent, DialogContentText,
        DialogActions, useMediaQuery, AppBar, Toolbar, Typography, Slide } from '@material-ui/core';
import { IconButton, Paper } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import DehazeIcon from '@material-ui/icons/Dehaze';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SaveIcon from '@material-ui/icons/Save';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import PopEditDeckInfo from '../../../pages/components/PopEditDeckInfo';

import CloseIcon from '@material-ui/icons/Close';


import Dropzone from '../../../pages/components/Dropzone'
import ModalUnsplash from '../../../pages/components/ModalUnsplash'
import Lightbox from 'react-image-lightbox';

import { TransitionProps } from '@material-ui/core/transitions';

export type Question = {
    id: string;
    question: string;
    answer: string[];
    tip: string;
    bad_options: string[];
    imageurl:string;
  };




const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DecksEdit({ cardsData, deckData, sessionUser, keywords }: any) {
    const isMobile = useMediaQuery("(max-width: 800px)");
    const [isPicOpen, setisPicOpen] = useState(false);
    const [value, setValue] = React.useState('Controlled');


    const [openClue, setOpenClue] = React.useState(false);
    const [openSearch, setOpenSearch] = React.useState(false);



    const [fileNames, setFileNames] = useState([]);
    const handleDrop = (acceptedFiles: { map: (arg0: (file: any) => any) => React.SetStateAction<never[]>; }) =>
      setFileNames(acceptedFiles.map(file => file.name));

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

    const handleClickClueOpenMobile = () => {
        setOpenClue(true);
    };

    const handleCloseClue = () => {
        setOpen(false);
    };

    const handleClickPreviewOpen = () => {
        setOpen(true);
    }

    const handlePreviewClose = () =>
    {
        setOpen(false)
    }


    const handleCloseClueMobile = () => {
        setOpenClue(false);
    };



    const handleClickSearchOpen = () => {
        setOpenSearch(true);
    };

    const handleCloseSearch = () => {
        setOpenSearch(false);
    };
    const [isOpenEditDeckInfo,setisOpenEditDeckInfo]=useState(false);
    const handleOpenEdit = () => {
        setisOpenEditDeckInfo(true);
    };

    const handleCloseEdit = () => {
        setisOpenEditDeckInfo(false);
    };

    const [deckTitle, setDeckTitle] = useState(deckData.title);
    const [deckimgurl, setdeckimgurl] = useState(deckData.imageurl);
    const [search, setSearch] = useState("");

    // Tous les hooks/fonctions relatifs aux cartes en dessous 

    const [questions, setQuestions] = useState<Question[]>(cardsData);
    const [actualQuestionIndex, setActualQuestionIndex] = useState(0);
    const [allOptions, setAllOptions] = useState(questions[actualQuestionIndex].answer.concat(questions[actualQuestionIndex].bad_options));
    const [cardimageurl, setcardimageurl] = useState(questions[actualQuestionIndex].imageurl);

    console.log(questions)
    console.log(allOptions)

    const addAnswer = () => {
        let tempQuest = [...questions];
        tempQuest[actualQuestionIndex].bad_options.push("")
        setQuestions(tempQuest);
        let allOptionstemp = [...allOptions]
        allOptionstemp.push("")
        setAllOptions(allOptionstemp)
    }

    //Change good to bad - checkbox
    function changeGoodCheck(idx: any, e: any, val: any) {
        let tempQuest = [...questions];
        tempQuest[actualQuestionIndex].answer = tempQuest[actualQuestionIndex].answer.filter(checked_option => checked_option !== val);
        tempQuest[actualQuestionIndex].bad_options.push(val);
        setQuestions(tempQuest)
      }
    
    //Change bad to good - checkbox
    function changeBadCheck(idx: any, e: any, val: any) {
        let tempQuest = [...questions];
        tempQuest[actualQuestionIndex].bad_options = tempQuest[actualQuestionIndex].bad_options.filter(checked_option => checked_option !== val);
        tempQuest[actualQuestionIndex].answer.push(val);
        setQuestions(tempQuest)
      }

      //Same for the input
      function changeGoodInput(idx: any, e: any, val: any) {
        const updatedAll = [...allOptions];
        updatedAll[idx] = e.target.value;
        setAllOptions(updatedAll)

        let tempQuest = [...questions];
        tempQuest[actualQuestionIndex].answer[idx] = e.target.value;
        setQuestions(tempQuest)
      }

      function changeBadInput(idx: any, e: any, val: any) {
        const updatedAll = [...allOptions];
        updatedAll[idx] = e.target.value;
        setAllOptions(updatedAll)

        let tempQuest = [...questions];
        tempQuest[actualQuestionIndex].bad_options[idx] = e.target.value;
        setQuestions(tempQuest)
      }


      function deleteOption(val: any,idx:any) {
        let tempQuest = [...questions];
        tempQuest[actualQuestionIndex].answer = tempQuest[actualQuestionIndex].answer.filter(x => x != "")
        tempQuest[actualQuestionIndex].bad_options = tempQuest[actualQuestionIndex].bad_options.filter(x => x != "")
        let updatedAll = [...allOptions];
        updatedAll.splice(idx,1);
        setAllOptions(updatedAll);
        console.log("bonjour", tempQuest[actualQuestionIndex])
        if (tempQuest[actualQuestionIndex].answer.includes(val)){
            
            tempQuest[actualQuestionIndex].answer.splice(idx,1);
            setQuestions(tempQuest)

        }else{
            console.log("coucou", idx);
            tempQuest[actualQuestionIndex].bad_options.splice(idx - tempQuest[actualQuestionIndex].answer.length, 1);
            setQuestions(tempQuest)
            console.log("fgdsftgs77retfhgs",tempQuest[actualQuestionIndex])
        }
        console.log("au revoir", tempQuest[actualQuestionIndex]);
      }

      const changeCard = (idx:any) =>{
        let index = actualQuestionIndex
        saveQuestion(index);
        setActualQuestionIndex(idx);
      }

      function setQuest(val:any){
        let tempQuest = [...questions];
        tempQuest[actualQuestionIndex].question = val;
        setQuestions(tempQuest);
      }

      function setTip(val:any){
        let tempQuest = [...questions];
        tempQuest[actualQuestionIndex].tip = val;
        setQuestions(tempQuest);
      }


      useEffect(() => {
        setAllOptions(questions[actualQuestionIndex].answer.concat(questions[actualQuestionIndex].bad_options).filter(x => x != ""))
      },[actualQuestionIndex]);

      useEffect(() => {
        setcardimageurl(questions[actualQuestionIndex].imageurl)
      },[isPicOpen]);


      const addCard = async() => {
        let tempQuest = [...questions];
        const newid = create_UUID();

        const blank = {
            id: newid,
            question: "",
            tip: "",
            bad_options: [],
            answer: [""],
            fk_user: sessionUser,
            imageurl : ""
          };
        
          tempQuest.push(blank);
          setQuestions(tempQuest);
          changeCard(tempQuest.indexOf(blank))

          const upload = await fetch(
            `http://localhost:3000/api/editDeck/addcard`,
            {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                question: tempQuest[tempQuest.indexOf(blank)],
                user: sessionUser,
                deck: deckData,
              }),
            }
          );

      }


      const deleteCard = async() => {
        let indexToDelete = actualQuestionIndex;
        setActualQuestionIndex(actualQuestionIndex-1)
        let tempQuest = [...questions];
        
        let toDel = questions[indexToDelete];
        tempQuest = tempQuest.filter(quest=> quest !== toDel)
        setQuestions(tempQuest);
        handleCloseMenu();

        const deleter = await fetch(
            `http://localhost:3000/api/editDeck/deletecard`,
            {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(toDel),
            }
          )
        
      };

      const duplicateCard = ()=>{

        handleCloseMenu()
        let tempQuest = [...questions];
        const newid = create_UUID();

        const blank = {
            id: newid,
            question: questions[actualQuestionIndex].question,
            tip: questions[actualQuestionIndex].tip,
            bad_options: questions[actualQuestionIndex].bad_options,
            answer: questions[actualQuestionIndex].answer,
            fk_user: sessionUser,
            imageurl : questions[actualQuestionIndex].imageurl
          };
          tempQuest.splice(actualQuestionIndex+1,0,blank);
          setQuestions(tempQuest);
        
      }

      const callbackImageUrl = (url:string) =>{
        let tempQuest = [...questions];
        tempQuest[actualQuestionIndex].imageurl = url;
        setQuestions(tempQuest);
      }

      async function saveQuestion(idx:any){
        let tempQuest = [...questions];
        const toUpload = tempQuest[idx];
        console.log(allOptions);
        console.log(toUpload);


        const upload = await fetch(
            `http://localhost:3000/api/editDeck/submitChanges`,
            {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(toUpload),
            }
        );

      }


      const hasError = (quest:any) =>{
          if(quest.question.length == 0){
              return true;
          }
      }
    const s = "search"
    //console.log(s.includes("sea"))
    return (
        <div className="wrapperHidden" >
            {
            !isMobile?
            <>
          
            <div className="mydiv-leftCard">
                <div className="mydiv-deckTitle" >
                    <div className="wrapper" >
                        <div className="mydiv-1left">
                            <div className="wrapper">
                                <div style={{ flex: '1' }}>
                                    <h3 style={{ marginLeft: '7px', color: 'black', textAlign: 'left' }}>{deckTitle}</h3>
                                </div>
                                <div style={{ width: '50px', marginTop:'12px' }}>
                                <IconButton aria-label="delete" style={{ float: 'right', color: 'black', marginTop: '0px', height: '35px' }} onClick={handleOpenEdit} >
                                    <SettingsIcon />
                                </IconButton>
                                    <PopEditDeckInfo>
                                        {isOpenEditDeckInfo}{setisOpenEditDeckInfo}{deckData}{keywords}
                                    </PopEditDeckInfo>
      
                                </div>
                            </div>
                        </div>
                        <div className="mydiv-222">
                            {
                                deckimgurl.length > 5 ? 
                                <img src={deckimgurl} object-fit="contain" style={{ height: '50px', margin: '5px', float: 'right' }} />
                                :
                                <img src="/pinguin.jpg" object-fit="contain" style={{ height: '50px', margin: '5px', float: 'right' }} />
                            }
                            
                        </div>
                    </div>

                </div>
                <div>
                    <Paper elevation={10} variant="outlined" style={{ height: '45px', borderColor: 'black', borderRadius: '5px' }}>
                        <InputBase
                            placeholder="Rechercher une carte"
                            style={{ margin: '7px 0 0 10px', width: '80%' }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <IconButton type="submit" aria-label="search" style={{ float: 'right', textAlign: 'right'}}>
                            <SearchIcon/>
                        </IconButton>
                    </Paper>
                </div>
                
                <div className="divCardLeft">
                {questions.map((val: any, idx: any) => (

                    val.question.toLocaleLowerCase().includes(search.toLocaleLowerCase())?
                    <Button onClick={()=>changeCard(idx)} 
                    style={{margin:'0px', padding:'0px', width:'100%',backgroundColor:idx==actualQuestionIndex?'#4cb7ff':'transparent'}}>
    
                    <Card style={{ float: 'left', width: '98%', margin: '1%', maxHeight: "70px", border: "1px solid",backgroundColor:hasError(val)?'#ffe8e8':'white'}}>
                        <div className="wrapper">
                            <div className="mydiv-11">
                                <p style={{ fontWeight: 'bold', padding: '6px'}}>{idx+1} : {val.question}</p>
                            </div>
                            <div className="mydiv-222">
                                <img src={questions[idx].imageurl} object-fit="none" style={{ height: '100px', margin: '-0 -0 0 0', float: 'right', objectFit:"cover", width:'100px'}} />
                                {
                                    questions[idx].imageurl.length > 5 ?
                                    <img src={questions[idx].imageurl}  style={{ height: '100px', margin: '0 0 0 0', float: 'right', width:"100px", objectFit:"cover"}} />
                                    :
                                    deckData.imageurl.length > 5 ?

                                    <img src={deckData.imageurl}  style={{ height: '100px', margin: '0 0 0 0', float: 'right', width:"100px", objectFit:"cover"}} />
                                    :
                                    <img src={'/pinguin.jpg'}  style={{ height: '100px', margin: '0 0 0 0', float: 'right', width:"100px", objectFit:"cover"}} />
                                }
                                
                            </div>
                        </div>
                    </Card>
                    </Button>
                    :null

                    ))}
                </div>
                 
                <Card style={{ float: 'left', width: '415px', maxHeight: "100px", position: 'fixed', bottom: '0px', left: '0px', margin: '5px', backgroundColor: 'blue' }}>
                    <Button
                        onClick={addCard}
                        variant="contained"
                        color="primary"
                        style={{ height: '75px', width: '100%' }}
                    >
                        <h3>Ajouter une nouvelle carte</h3>

                    </Button>
                </Card>


            </div>
            <div className="mydiv-rightCard" style={{ height: 'calc(100vh - 64px)' }} >
                <Card elevation={7} style={{ width: '80%', margin: '0 auto', marginTop: '30px', paddingBottom: '20px', overflowY: 'scroll', maxHeight: 'calc(100vh - 130px)', maxWidth: '600px' }}>
                    <Dropzone></Dropzone>
                    {
                        questions[actualQuestionIndex].imageurl.length > 5 ?
                        <img onClick={() => setisPicOpen(true)} src={questions[actualQuestionIndex].imageurl} object-fit="contain" style={{ height: '100px', margin: '20px 0 0 0' }} className="item"/>
                        :
                        null
                    }
                    
                    {/* <p style={{ margin: '10px 0 0 0' }}>Déposez une image de votre ordinateur ici</p> */}
                    <div className="wrapper" style={{ margin: '10px 0 0 0' }}>
                        <div style={{ flex: '1' }}>
                            <ModalUnsplash>{deckData}{callbackImageUrl}{false}</ModalUnsplash>
                        </div>
                        {/* <div style={{ flex: '1' }}>
                            <Button variant="contained">Téléverser une image</Button>
                        </div> */}
                    </div>
                    <Divider style={{ margin: '20px 0 0 0', height: '2px', background: 'black' }} />
                    <div style={{ width: '80%', margin: '0 auto', marginTop: '20px', paddingBottom: '20px' }}>
                        <Card elevation={5} style={{ width: '100%', height: '110px' }}>
                            <TextField
                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                placeholder="Écrivez ici votre question"
                                value = {questions[actualQuestionIndex].question}
                                onChange={(e) => setQuest(e.target.value)}
                                multiline
                                variant="outlined"
                                rows={4}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </Card>
                        <div className="wrapper" style={{ marginTop: '15px' }}>
                            <div style={{ flex: '1' }}>
                               
                                    {
                                        questions[actualQuestionIndex].question.length == 0?
                                        <Card style={{ marginTop: '8px', backgroundColor: 'red' }}>
                                            <p style={{ margin: '10px', color: 'white' }}>La carte doit avoir une question</p>
                                       </Card>
                                        :
                                       questions[actualQuestionIndex].answer.length == 0?
                                       <Card style={{ marginTop: '8px', backgroundColor: 'red' }}>
                                            <p style={{ margin: '10px', color: 'white' }}>Sélectionnez au moins une bonne réponse</p>
                                       </Card>
                                       :
                                       questions[actualQuestionIndex].answer.length == 1?
                                       <Card style={{ marginTop: '8px', backgroundColor: '#4cb7ff' }}>
                                            <p style={{ margin: '10px', color: 'white' }}>1 bonne réponse sélectionnée</p>
                                       </Card>
                                       :
                                       <Card style={{ marginTop: '8px', backgroundColor: '#4cb7ff' }}>
                                            <p style={{ margin: '10px', color: 'white' }}>{questions[actualQuestionIndex].answer.length} bonnes réponses sélectionnées</p>
                                       </Card>
                                    }
                                    
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
                                                value = {questions[actualQuestionIndex].tip}
                                                onChange = {(e) => setTip(e.target.value)}
                                                multiline
                                                variant="outlined"
                                                rows={4}
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </Card>
                                    </DialogContent>
                                    <DialogActions>
                                        {/* <Button onClick={handleCloseClue} color="primary">
                                            Annuler
                                         </Button>
                                        <Button onClick={handleCloseClue} color="primary">
                                            Sauvegarder
                                        </Button> */}
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
                                    <MenuItem onClick={duplicateCard}>
                                        <ListItemIcon>
                                            <FileCopyIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Dupliquer la carte" />
                                    </MenuItem>
                                    <MenuItem onClick={handleClickPreviewOpen}>
                                        <ListItemIcon>
                                            <FindInPageIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Prévisualisation" />
                                    </MenuItem>
                                    <MenuItem onClick={deleteCard} style={{ backgroundColor: 'red' }}>
                                        <ListItemIcon>
                                            <DeleteSweepIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Supprimer la carte" />
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div className="wrapper" style={{ margin: '0 -10px 0 -10px' }}>

                            {
                                
                                allOptions.map((val: any, idx: any) => (

                                    <Card elevation={3} style={{ flex: '1 0 35%', minWidth: '250px', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible', backgroundColor:questions[actualQuestionIndex].answer.includes(val)? 'rgb(220, 255, 220)':'white' }}>
                                    <IconButton onClick={() => deleteOption(val,idx)} aria-label="indice" style={{ height: '5px', width: '5px', top: '-10px', left: '-10px', position: 'absolute' }}>
                                        <CancelIcon  style={{ height: '17px', width: '17px', color: 'red' }} />
                                    </IconButton>
                                    <div className="wrapper">
                                        <div style={{ float: 'left', width: '80%' }}>
                                            <InputBase
                                                placeholder="Réponse"
                                                value={val}
                                                multiline
                                                style={{ width: '100%', float: 'left', margin: '3px 0 0 15px' }}
                                                onChange={
                                                    questions[actualQuestionIndex].answer.includes(val)
                                                      ? (e) => changeGoodInput(idx, e, val)
                                                      : (e) => changeBadInput(idx, e, val)
                                                  }
                                            />
                                        </div>
                                        <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', float: 'right' }}>
                                            <Checkbox
                                                checked={questions[actualQuestionIndex].answer.includes(val)}
                                                color="primary"
                                                style={{ float: 'right' }}
                                                onChange={
                                                    questions[actualQuestionIndex].answer.includes(val)
                                                      ? (e) => changeGoodCheck(idx, e, val)
                                                      : (e) => changeBadCheck(idx, e, val)
                                                  }
                                            />
                                        </div>
                                    </div>
                                </Card>
                                ))  
                            }
                            <Card elevation={3} style={{ flex: '1 0 35%', minWidth: '250px', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ width: '100%', height: '100%' }}
                                    endIcon={<AddCircleOutlineIcon />}
                                    onClick={addAnswer}
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
                        onClick = {()=>saveQuestion(actualQuestionIndex)}

                    >
                        Enregistrer la carte
                                </Button>
                </Card>
            </div>
        </>
        // VERSION MOBILE BELOW
            :
            
            <div className="mydiv-rightCard" style={{ height: 'calc(100vh - 64px)' }} >
            <Card elevation={7} style={{ width: '95%', margin: '0 auto', marginTop: '15px', paddingBottom: '20px', overflowY: 'scroll', maxHeight: 'calc(100vh - 230px)', maxWidth: '800px', borderRadius: '20px' }}>
                {
                    questions[actualQuestionIndex].imageurl.length > 5 ?
                    <img onClick={() => setisPicOpen(true)} src={questions[actualQuestionIndex].imageurl} object-fit="contain" style={{ height: '100px', margin: '20px 0 0 0' }} className="item"/>
                    :
                    null
                }
                <div className="wrapper" style={{ margin: '10px 0 0 0' }}>
                    <div style={{ flex: '1', margin: '0 5px 0 10px' }}>
                        <ModalUnsplash>{deckData}{callbackImageUrl}{false}</ModalUnsplash>
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
                                value = {questions[actualQuestionIndex].question}
                                onChange={(e) => setQuest(e.target.value)}
                                multiline
                                variant="outlined"
                                rows={4}
                                style={{ width: '100%', height: '100%' }}
                            />
                    </Card>
                    <div className="wrapper" style={{ marginTop: '15px' }}>
                        <div style={{ flex: '1' }}>
                        {
                            questions[actualQuestionIndex].question.length == 0?
                            <Card style={{ marginTop: '8px', backgroundColor: 'red' }}>
                                <p style={{ margin: '10px', color: 'white' }}>La carte doit avoir une question</p>
                            </Card>
                            :
                            questions[actualQuestionIndex].answer.length == 0?
                            <Card style={{ marginTop: '8px', backgroundColor: 'red' }}>
                                <p style={{ margin: '10px', color: 'white' }}>Sélectionnez au moins une bonne réponse</p>
                            </Card>
                            :
                            questions[actualQuestionIndex].answer.length == 1?
                            <Card style={{ marginTop: '8px', backgroundColor: '#4cb7ff' }}>
                                <p style={{ margin: '10px', color: 'white' }}>1 bonne réponse sélectionnée</p>
                            </Card>
                            :
                            <Card style={{ marginTop: '8px', backgroundColor: '#4cb7ff' }}>
                                <p style={{ margin: '10px', color: 'white' }}>{questions[actualQuestionIndex].answer.length} bonnes réponses sélectionnées</p>
                            </Card>
                        }
                        </div>
                        <div style={{ flex: '1', float: 'right', textAlign: 'right' }}>
                            <IconButton aria-label="indice" onClick={handleClickClueOpenMobile}>
                                <EmojiObjectsIcon style={{ height: '35px', width: '35px', color: 'orange' }} />
                            </IconButton>
                            <Dialog open={openClue} onClose={handleCloseClueMobile} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Indice</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Vous pouvez ajouter un indice à votre carte qui sera disponible sur demande.
                                    </DialogContentText>
                                    <Card elevation={5} style={{ width: '100%', height: '110px' }}>
                                        <TextField
                                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                            placeholder="Écrivez ici l'indice de votre carte"
                                            value = {questions[actualQuestionIndex].tip}
                                            onChange = {(e) => setTip(e.target.value)}
                                            multiline
                                            variant="outlined"
                                            rows={4}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </Card>
                                </DialogContent>
                                <DialogActions>
                                    {/* <Button onClick={handleCloseClue} color="primary">
                                        Annuler
                                     </Button>
                                    <Button onClick={handleCloseClue} color="primary">
                                        Sauvegarder
                                    </Button> */}
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
                                <MenuItem onClick={duplicateCard}>
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
                                <MenuItem onClick={deleteCard} style={{ backgroundColor: 'red' }}>
                                    <ListItemIcon>
                                        <DeleteSweepIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Supprimer la carte" />
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <div className="wrapper" style={{ margin: '0 -10px 0 -10px' }}>
                    {

                    
                    allOptions.map((val: any, idx: any) => (

                        <Card elevation={3} style={{ flex: '1 0 60%', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible', backgroundColor: 'rgb(220, 255, 220)' }}>
                            <IconButton onClick={() => deleteOption(val,idx)} aria-label="indice" style={{ height: '5px', width: '5px', top: '-10px', left: '-10px', position: 'absolute' }}>
                                <CancelIcon style={{ height: '17px', width: '17px', color: 'red' }} />
                            </IconButton>
                            <div className="wrapper">
                                <div style={{ float: 'left', width: '80%' }}>
                                    <InputBase
                                        placeholder='Réponse 1'
                                        value={val}
                                        multiline
                                        onChange={
                                            questions[actualQuestionIndex].answer.includes(val)
                                              ? (e) => changeGoodInput(idx, e, val)
                                              : (e) => changeBadInput(idx, e, val)
                                          }
                                        style={{ width: '100%', float: 'left', margin: '3px 0 0 15px' }}
                                    />
                                </div>
                                <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', float: 'right' }}>
                                    <Checkbox
                                        checked = {questions[actualQuestionIndex].answer.includes(val)}
                                        color="primary"
                                        style={{ float: 'right' }}
                                        onChange={
                                            questions[actualQuestionIndex].answer.includes(val)
                                              ? (e) => changeGoodCheck(idx, e, val)
                                              : (e) => changeBadCheck(idx, e, val)
                                          }
                                    />
                                </div>
                            </div>
                        </Card>
                            ))  
                        }
                        <Card elevation={3} style={{ flex: '1 0 60%', margin: '10px 10px 0 10px', position: 'relative', overflow: 'visible' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ width: '100%', height: '100%' }}
                                endIcon={<AddCircleOutlineIcon />}
                                onClick={addAnswer}
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
                    onClick = {()=>saveQuestion(actualQuestionIndex)}
                >
                    Enregistrer la carte
                            </Button>
            </Card>
            <div style={{ float: 'left', width: '100%', height: '35px', maxHeight: "35px", position: 'fixed', bottom: '100px', left: '0px', margin: '0px', backgroundColor: 'rgb(192, 197, 255)' }}>
                <div className="wrapper">
                    <div style={{ width: '50px', float: 'left' }}>
                    <IconButton aria-label="delete" style={{ float: 'right', color: 'black', marginTop: '0px', height: '35px' }} onClick={handleOpenEdit} >
                                    <SettingsIcon />
                                </IconButton>
                                    <PopEditDeckInfo>
                                        {isOpenEditDeckInfo}{setisOpenEditDeckInfo}{deckData}{keywords}
                                    </PopEditDeckInfo>
                    </div>
                    <div style={{ width: 'calc(100% - 100px)', float: 'left', textAlign: 'left' }}>
                        <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{deckTitle}</p>
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
                                            {deckTitle}
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <div style={{ margin: '70px 10px 0 10px' }}>
                                    <Paper elevation={10} variant="outlined" style={{ height: '45px', borderColor: 'black', borderRadius: '5px' }}>
                                        <InputBase
                                            placeholder="Rechercher une carte"
                                            onChange={(e) => setSearch(e.target.value)}
                                            style={{ margin: '7px 0 0 10px', width: '80%' }}
                                        />
                                        <IconButton type="submit" aria-label="search" style={{ float: 'right', textAlign: 'right' }}>
                                            <SearchIcon />
                                        </IconButton>
                                    </Paper>

                                    {questions.map((val: any, idx: any) => (
                                    val.question.toLocaleLowerCase().includes(search.toLocaleLowerCase())?
                                    <Button style={{ margin: '0px', padding: '0px', width:'100%', paddingBottom:"8px", paddingTop:"8px" }}>
                                        <Card style={{ float: 'left', width: '100%', maxHeight: "100px", border: "1px solid" }}>
                                            <div className="wrapper">
                                                <div className="mydiv-11">
                                                    <p style={{ fontWeight: 'bold', padding: '6px' }}>{idx+1} : {val.question}</p>
                                                </div>
                                                <div className="mydiv-222">
                                                    {
                                                        questions[idx].imageurl.length > 5 ?
                                                        <img src={questions[idx].imageurl}  style={{ height: '100px', margin: '0 0 0 0', float: 'right', width:"100px", objectFit:"cover"}} />
                                                        :
                                                        deckData.imageurl.length > 5 ?
                                                        <img src={deckData.imageurl}  style={{ height: '100px', margin: '0 0 0 0', float: 'right', width:"100px", objectFit:"cover"}} />
                                                        :
                                                        <img src={'/pinguin.jpg'}  style={{ height: '100px', margin: '0 0 0 0', float: 'right', width:"100px", objectFit:"cover"}} />
                                                    }
        
                                                </div>
                                            </div>
                                        </Card>
                                    </Button>
                                    :null
                                    ))}
                                </div>

                                <Button style={{margin:'auto',padding:'10px', display:'flex', marginTop:'10px', backgroundColor:"white"}} onClick={handleCloseSearch} >Fermer</Button>
                            </div>

                        </Dialog>
                    </div>
                </div>
            </div>
            <div style={{ float: 'left', width: '100%', height: '100px', maxHeight: "100px", position: 'fixed', bottom: '0px', left: '0px', margin: '0px', backgroundColor: 'rgb(192, 197, 255)' }}>
                <div className="wrapper">
                    <div style={{ width: '80%', float: 'left' }}>
                        <div style={{ display: 'flex', overflowX: 'auto' }}>
                            
                        {questions.map((val: any, idx: any) => (
                            
                        <Card elevation={3} style={{ width: '50%', maxWidth: '50%', minWidth: '50%', margin: '5px 0px 5px 5px', height: '90px' }}>
                            <Button
                            variant="contained"
                            style={{ height: '100%', width: '100%', margin: '0px', padding: '0px', backgroundColor:'white' }}
                            onClick={()=>changeCard(idx)}     
                            >
                                    <div className="wrapper" style={{ width: '100%', height: '100%' }}>
                                        <div style={{ float: 'left', width: '70%', overflow: 'hidden', height: '90px' }}>
                                            <p style={{ fontWeight: 'bold', textTransform: 'none', textAlign: 'left', padding: '3px' }}>{idx+1} : {val.question}</p>
                                        </div>
                                        <div style={{ float: 'right', width: '30%', height: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        {
                                            questions[idx].imageurl.length > 5 ?
                                            <img src={questions[idx].imageurl}  style={{ height: '100px', margin: '0 0 0 0', float: 'right', width:"100px", objectFit:"cover"}} />
                                            :
                                            deckData.imageurl.length > 5 ?

                                            <img src={deckData.imageurl}  style={{ height: '100px', margin: '0 0 0 0', float: 'right', width:"100px", objectFit:"cover"}} />
                                            :
                                            <img src={'/pinguin.jpg'}  style={{ height: '100px', margin: '0 0 0 0', float: 'right', width:"100px", objectFit:"cover"}} />
                                        }
                                        </div>
                                    </div>

                            </Button>
                        </Card>
                            
                         ) )}

                            
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
            
            }
                        {isPicOpen && (
          <Lightbox
            mainSrc={cardimageurl}
            onCloseRequest={() => setisPicOpen(false)}
          />
        )}
        </div>
    )
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

    const keywordsjson = await fetch(
        `http://localhost:3000/api/decks/deckkeywords`,
        {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
        }
    );
    const keywords = await keywordsjson.json();
  
    return {
      props: {
        deckData,
        cardsData,
        sessionUser,
        keywords
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