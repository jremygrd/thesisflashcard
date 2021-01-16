import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
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
// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));

export default function mytest() {
  // const classes = useStyles();
  return (
    <div>
      <div className="wrapper">
        <div className="mydiv-1">
          <img src="/pinguin.jpg" object-fit="contain" height="10%" />
          <h1>Titre du deck</h1>
          <h3 style={{ textAlign: 'left', margin: '5px 5px 15px 15px' }}>Catégorie : Animaux</h3>
          <div className="wrapper">
            <h3 style={{ textAlign: 'left', margin: '5px 5px 5px 15px' }}>Mots clés :</h3>
            <Chip label="Pinguin" color="primary" style={{ marginLeft: '7px', marginBottom: '5px' }} />
            <Chip label="Animal" color="primary" style={{ marginLeft: '7px' }} />
            <Chip label="Banquise" color="primary" style={{ marginLeft: '7px' }} />
            <Chip label="Pôle Nord" color="primary" style={{ marginLeft: '7px' }} />
            <Chip label="Papa Noel" color="primary" style={{ marginLeft: '7px' }} />
          </div>
          <p style={{ textAlign: 'left', margin: '15px 5px 15px 15px' }}>Ceci est le super deck du pinguin il est vraiment top cest tristan qui l'a fait et le pingouin est un animal en voie de disparition</p>
          <div className="wrapper">
            <div className="mydiv-11">
              <div >
                <Button style={{ width: '40%', height: '40px', marginLeft: '15px' }} variant="contained" color="primary">
                  Play
                </Button>
                <Button style={{ width: '40%', height: '40px', marginLeft: '15px' }} variant="contained" color="secondary">
                  Edit
                </Button>
              </div>
            </div>
            <div className="mydiv-22">
              <IconButton aria-label="delete">
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <StarBorderIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
          <div className="wrapper">
            <p style={{ textAlign: 'left', margin: '30px 5px 5px 15px' }}>Créateur du deck : </p>
            <AvatarGroup max={4} style={{ margin: '18px 0px 0px 0px' }}>
              <Avatar alt="Remy Sharp" src="/pinguin.jpg" />
            </AvatarGroup>
          </div>
          <div className="wrapper">
            <p style={{ textAlign: 'left', margin: '30px 5px 5px 15px' }}>Éditeurs du deck : </p>
            <AvatarGroup max={4} style={{ margin: '18px 0px 0px 0px' }}>
              <Avatar alt="Remy Sharp" src="/pinguin.jpg" />
              <Avatar alt="Travis Howard" src="/pinguin.jpg" />
              <Avatar alt="Cindy Baker" src="/pinguin.jpg" />
              <Avatar alt="Agnes Walker" src="/pinguin.jpg" />
              <Avatar alt="Trevor Henderson" src="/pinguin.jpg" />
            </AvatarGroup>
          </div>


        </div>
        <div className="mydiv-2">
          <Card style={{ margin: '15px' }} >
            <CardContent>
              <div className="wrapper">
                <ExpansionPanel style={{ margin: '-7px -16px -32px -16px', width: '150%' }}>
                  <ExpansionPanelSummary style={{ maxHeight: '150px' }}>
                    <div className="mydiv-11">
                      <p>1 - Question réponse simple</p>
                      <p style={{ fontWeight: 'bold' }}>Quel est la capital de la France ?</p>
                    </div>
                    <div className="mydiv-222">
                      <img src="/pinguin.jpg" object-fit="contain" style={{ height: '150px', margin: '-16px -16px 0 0', float: 'right' }} />
                    </div>

                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ margin: '-15px -15px -5px -15px' }} >
                    <div style={{ width: '100%' }} >
                      <Card style={{ margin: '7px', backgroundColor:'rgb(255, 220, 220)' }} >
                        <CardContent>
                          <div className="wrapper">
                            <div className="mydiv-11">
                              <p style={{ fontWeight: 'bold' }}>Lyon</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card style={{ margin: '7px', backgroundColor:'rgb(220, 255, 220)' }} >
                        <CardContent>
                          <div className="wrapper">
                            <div className="mydiv-11">
                              <p style={{ fontWeight: 'bold' }}>Paris</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card style={{ margin: '7px', backgroundColor:'rgb(255, 220, 220)' }} >
                        <CardContent>
                          <div className="wrapper">
                            <div className="mydiv-11">
                              <p style={{ fontWeight: 'bold' }}>Marseille</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card style={{ margin: '7px', backgroundColor:'rgb(255, 220, 220)' }} >
                        <CardContent>
                          <div className="wrapper">
                            <div className="mydiv-11">
                              <p style={{ fontWeight: 'bold' }}>Bordeaux</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </CardContent>
          </Card>
          <Card style={{ margin: '15px' }} >
            <CardContent>
              <div className="wrapper">
                <ExpansionPanel style={{ margin: '-7px -16px -32px -16px', width: '150%' }}>
                  <ExpansionPanelSummary style={{ maxHeight: '150px' }}>
                    <div className="mydiv-11">
                      <p>2 - Question réponses multiples</p>
                      <p style={{ fontWeight: 'bold' }}>De quelle couleur est un zebre ?</p>
                    </div>
                    <div className="mydiv-222">
                      <img src="/pinguin.jpg" object-fit="contain" style={{ height: '150px', margin: '-16px -16px 0 0', float: 'right' }} />
                    </div>

                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ margin: '-15px -15px -5px -15px' }} >
                    <div style={{ width: '100%' }} >
                      <Card style={{ margin: '7px', backgroundColor:'rgb(220, 255, 220)' }} >
                        <CardContent>
                          <div className="wrapper">
                            <div className="mydiv-11">
                              <p style={{ fontWeight: 'bold' }}>Blanc</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card style={{ margin: '7px', backgroundColor:'rgb(255, 220, 220)' }} >
                        <CardContent>
                          <div className="wrapper">
                            <div className="mydiv-11">
                              <p style={{ fontWeight: 'bold' }}>Violet</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card style={{ margin: '7px', backgroundColor:'rgb(220, 255, 220)' }} >
                        <CardContent>
                          <div className="wrapper">
                            <div className="mydiv-11">
                              <p style={{ fontWeight: 'bold' }}>Noir</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card style={{ margin: '7px', backgroundColor:'rgb(255, 220, 220)' }} >
                        <CardContent>
                          <div className="wrapper">
                            <div className="mydiv-11">
                              <p style={{ fontWeight: 'bold' }}>Orange</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>


  )
}