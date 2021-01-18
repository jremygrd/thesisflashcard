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


export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.decks;
  const myDeck = await fetch(`http://localhost:3000/api/decks/${slug}`);
  const deckData = await myDeck.json();
  const myCards = await fetch(`http://localhost:3000/api/cardsFromDeck/${slug}`);
  const cardsData = await myCards.json();
  cardsData.forEach((element: any) => {
    if (element.answer.length == 1 && element.bad_options.length == 0) {
      element.qcm = 'Question réponse libre';
    }
    else if (element.answer.length > 1) {
      element.qcm = 'Question réponses multiples';
    }
    else {
      element.qcm = 'Question réponse simple';
    }

  });
  return {
    props: {
      deckData, cardsData
    }
  }
}

export default function mytest({ deckData, cardsData }: any) {

  // const classes = useStyles();
  console.log(cardsData);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <div className="wrapper">
        <div className="mydiv-1">
          <img src="/pinguin.jpg" object-fit="contain" height="10%" />
          <h1>{deckData.title}</h1>
          <h3 style={{ textAlign: 'left', margin: '5px 5px 15px 15px' }}>Catégorie : Animaux</h3>
          <div className="wrapper">
            <h3 style={{ textAlign: 'left', margin: '5px 5px 5px 15px' }}>Mots clés :</h3>
            <Chip label="Pinguin" color="primary" style={{ marginLeft: '7px', marginBottom: '5px' }} />
            <Chip label="Animal" color="primary" style={{ marginLeft: '7px' }} />
            <Chip label="Banquise" color="primary" style={{ marginLeft: '7px' }} />
            <Chip label="Pôle Nord" color="primary" style={{ marginLeft: '7px' }} />
            <Chip label="Papa Noel" color="primary" style={{ marginLeft: '7px' }} />
          </div>
          <p style={{ textAlign: 'left', margin: '15px 5px 15px 15px' }}>{deckData.description}</p>
          <div className="wrapper">
            <div className="mydiv-11">
              <div >
                <Button style={{ width: '40%', height: '40px', marginLeft: '15px' }} variant="contained" color="primary">
                  Jouer
                </Button>
                <Button style={{ width: '40%', height: '40px', marginLeft: '15px' }} variant="contained" color="secondary">
                  Éditer
                </Button>
              </div>
            </div>
            <div className="mydiv-22">
              <div className="wrapper" style={{ float: 'right' }}>
                <PopShareDeck></PopShareDeck>
                <Checkbox icon={<StarBorderIcon />} checkedIcon={<StarIcon />} name="checkedH" />
                <IconButton aria-label="delete" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Dupliquer le deck</MenuItem>
                  <MenuItem onClick={handleClose}>Supprimer le deck</MenuItem>
                </Menu>
              </div>

            </div>
          </div>
        </div>
        <div className="mydiv-2">
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
                        <img src="/pinguin.jpg" object-fit="contain" style={{ height: '150px', margin: '-16px -16px 0 0', float: 'right' }} />
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
  )
}