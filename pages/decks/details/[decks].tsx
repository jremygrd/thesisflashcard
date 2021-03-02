import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Shop } from '@material-ui/icons';
import { sizing } from '@material-ui/system';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion } from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core';
import { AccordionDetails } from '@material-ui/core';
import React, { useState, useEffect, Component } from "react";
import next, { GetServerSideProps } from "next";
import Switch from '@material-ui/core/Switch';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import PopShareDeck from '../../components/PopShareDeck';
import UploadFile from '../../components/UploadFile';

import NavBar from '../../components/NavBar';

import Router, { useRouter } from 'next/router'
import Link from 'next/link';

import ModalUnsplash from "../../components/ModalUnsplash";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.decks;
  const myDeck = await fetch(`http://localhost:3000/api/decks/${slug}`);
  const deckData = await myDeck.json();

  const opts = { fk_deck: slug, fk_user: sessionUser };

  const authorjson = await fetch(
    `http://localhost:3000/api/decks/deckAuthor`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
    }
  );
  const author = await authorjson.json();

  const keywordsjson = await fetch(
    `http://localhost:3000/api/decks/deckkeywords`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
    }
  );
  const keywords = await keywordsjson.json();

  const isFavorite = await fetch(
    `http://localhost:3000/api/decks/isFavorite`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
    }
  );

  const isFavjson = await isFavorite.json();
  const isFav= isFavjson[0].favorite;
  const myCards = await fetch(`http://localhost:3000/api/allcards_stacks/${slug}`);
  const cardsData = await myCards.json();

  cardsData.forEach((element: any) => {
    if (element.answer.length == 1 && element.bad_options.length == 0) {
      element.qcm = 'Une bonne réponse avec saisie manuelle';
    }
    else if (element.answer.length > 1) {
      element.qcm = 'Plusieurs bonnes réponses';
    }
    else {
      element.qcm = 'Une bonne réponse';
    }

  });
  return {
    props: {
      deckData, cardsData,isFav,author,keywords
    }
  }
}

const sessionUser = "1w7K30BqJFTR6rJLKdAP9aasoKM2"

export default function mytest({ deckData, cardsData,isFav,author,keywords }: any) {
  // const classes = useStyles();
 // console.log(cardsData);
  const [isFavorite, setIsFavorite] = React.useState(isFav);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [router,setRouter] = useState(useRouter());

  const [imageUrl, setImageUrl] = React.useState(deckData.imageurl);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDuplicate = async() => {
    handleClose();
    const opts = { deck: deckData, fk_user: sessionUser};

    const duplicateDeck = await fetch(
      `http://localhost:3000/api/decks/duplicateDeck`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
      }
    );
  };

  const redirectTo = (uuidstack:any)=>{
    router.push(`/`);
  }

  const handleDelete = async() => {
    handleClose();
    const opts = { deck: deckData, fk_user: sessionUser};

    const deleteDeck = await fetch(
      `http://localhost:3000/api/decks/deleteDeck`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
      }
    ).then(res => res.json()).then( res=> redirectTo(res.uuidstack) );;
  };

  const handleCheckFav = async() => {
    const isFavNow = !isFavorite;
    setIsFavorite(isFavNow);
    const opts = { fk_deck: deckData.id, fk_user: sessionUser,favorite:isFavNow };
    const changeFavorite = await fetch(
      `http://localhost:3000/api/decks/changeFavorite`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
      }
    );

    
  };

  const addToMyDecks = async() => {
    const opts = { fk_deck: deckData.id, fk_user: sessionUser };
    const isFavorite = await fetch(
      `http://localhost:3000/api/decks/addToMyDecks`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
      }
    );
  };

  const callbackImageUrl = (url:string) =>{
    setImageUrl(url);
  }


  return (
    <div>
      <div className="wrapper">
        <div className="mydiv-1" style = {{paddingLeft:'32px', paddingTop:'16px', paddingRight:'32px', paddingBottom:'16px'}}>
          <div  style ={{backgroundColor:"white", borderRadius:'5px', boxShadow:' 0 2px 5px 0 rgba(0,0,0,0.2)' }}>
          
          {
            deckData.imageurl.length < 2 ?
            <img src="/pinguin.jpg" object-fit="contain" height="20rem" style ={{borderRadius:'5px 5px 0px 0px'}} />
            :
            <div  style={{ maxHeight: '11.5rem', overflow:'hidden'}}>
            <div className="fill">
              <img src= {imageUrl} />
            </div>
            </div>
          }
          
          <h1>{deckData.title}</h1>
          <h4>par {author[0].name}</h4>
          <h3 style={{ textAlign: 'left', margin: '5px 5px 15px 15px' }}>Catégorie : {deckData.categorie}</h3>
          <div className="wrapper">
            <h3 style={{ textAlign: 'left', margin: '5px 5px 5px 15px' }}>Mots clés :</h3>
            {keywords.map(({keyword}: any) => (
            <Chip label={keyword} color="primary" style={{ marginLeft: '7px', marginBottom: '5px' }} />
            ))}
          </div>
          <p style={{ textAlign: 'left', margin: '15px 5px 15px 15px' }}>{deckData.description}</p>
          <div className="wrapper" style = {{paddingBottom:'8px'}}>
            <div className="mydiv-11">
              <div >
                <Link as = {`/decks/${deckData.id}`} href = "/decks/[decks]">
                  <Button style={{ width: '40%', height: '40px', marginLeft: '15px' }} variant="contained" color="primary">
                    Jouer
                  </Button>
                </Link>

                {sessionUser == deckData.fk_user?
                <>
                <Link as = {`/decks/edit/${deckData.id}`} href = "/decks/edit/[decks]">
                  <Button style={{ width: '40%', height: '40px', marginLeft: '15px' }} variant="contained" color="secondary">
                    Éditer
                  </Button>
                </Link>

                {/* <ModalUnsplash>{deckData}{callbackImageUrl}{true}</ModalUnsplash> */}

                {/* <UploadFile>{deckData}</UploadFile> */}
                </>
                :
                <Button style={{ width: '70%', height: '40px', marginLeft: '15px',marginTop:'15px' }} 
                variant="contained" 
                color="secondary"
                onClick={addToMyDecks}>
                    Ajouter à mes decks
                </Button>
                }
              </div>
            </div>
            <div className="mydiv-22">
              <div className="wrapper" style={{ float: 'right', flexWrap:'nowrap'}}>
                <PopShareDeck>
                  {deckData}
                </PopShareDeck>
                <Checkbox 
                icon={<StarBorderIcon />} 
                checkedIcon={<StarIcon />} 
                name="checkedH" 
                checked = {isFavorite}
                onChange={handleCheckFav}
                />
                <IconButton aria-label="delete" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  <MoreVertIcon/>
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleDuplicate}>Dupliquer le deck</MenuItem>
                  <MenuItem onClick={handleDelete}>Supprimer le deck</MenuItem>
                </Menu>
              </div>

            </div>
          </div>
        </div>
        </div>
        <div className="mydiv-2" style = {{ paddingTop:'16px'}}>
          <div style = {{borderRadius:'5px',border:'1px solid transparent', backgroundColor:"#f4f4f4", boxShadow:' 0 2px 5px 0 rgba(0,0,0,0.2)'}}>
          {cardsData.map(({ question, bad_options, answer, qcm }: any, index: any) => (
            <Card style={{ margin: '15px' }} >
              <CardContent>
                <div className="wrapper">
                  <ExpansionPanel style={{ margin: '-7px -16px -32px -16px', width: '150%' }}>
                    <ExpansionPanelSummary style={{ maxHeight: '150px' }}>
                      <div className="mydiv-11">
                        <p>{index + 1} - {qcm}</p>
                        <p style={{ fontWeight: 'bold' }}>{question}</p>
                      </div>
                      <div className="mydiv-222">
                        <img src={imageUrl} object-fit="contain" style={{ height: '150px', margin: '-16px -16px 0 0', float: 'right' }} />
                      </div>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ margin: '-15px -15px -5px -15px' }} >
                      <div style={{ width: '100%' }} >
                        {answer.map((value: any) => (
                          <Card style={{ margin: '7px', backgroundColor: 'rgb(220, 255, 220)' }} >
                            <CardContent>
                              <div className="wrapper">
                                <div className="mydiv-11">
                                  <p style={{ fontWeight: 'bold' }}>{value}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        {bad_options.map((value: any) => (
                          <Card style={{ margin: '7px', backgroundColor: 'rgb(255, 220, 220)' }} >
                            <CardContent>
                              <div className="wrapper">
                                <div className="mydiv-11">
                                  <p style={{ fontWeight: 'bold' }}>{value}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}