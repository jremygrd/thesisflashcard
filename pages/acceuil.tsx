import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeckList from '../pages/components/DeckList'
import ExamList from '../pages/components/ExamList'
import ModalCreateDeck from './components/ModalCreateDeck'
import ModalCreateExam from './components/ModalCreateExam'
import { Backdrop, Checkbox, CircularProgress, Fab, Fade, FormControlLabel, Grid, IconButton, InputBase, Modal, Paper, TextField } from '@material-ui/core';
import styles from '../styles/Home.module.css'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import AddIcon from '@material-ui/icons/Add';
import { useRouter } from 'next/router';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { PlayCircleFilledWhite } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';


function getTime(UNIX_timestamp: any) {
  var a = new Date(UNIX_timestamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();

  var time = date + ' ' + month + ' ' + year;
  return time;
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root2: {
    // maxWidth: 300,
    // minWidth: 300,
    marginRight:'auto',
    marginLeft:'auto',
    margin: '20px',
    backgroundColor: "whiteSmoke",
    borderRadius: '15px',
    textAlign:'left'
    


  },
  root: {
    maxWidth: 285,
    minWidth: 285,
    // marginRight:'auto',
    // marginLeft:'auto',
    margin: '20px',
    height: 400,

  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: 'auto',
    height: "50%",
    width: '50%',
    minWidth: "450px",
    minHeight: "600px",

  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 3,
    color: '#fff',
  },
}));

export default function Acceuil({ deckData, sessionUser, examList }: any) {
  const classes = useStyles();
  console.log(deckData);
  const [value, setValue] = React.useState('one');
  const [decksHook, setDecks] = useState(deckData)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [result, setresult] = useState(deckData)
  const [resultExam, setresultExam] = useState([])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = React.useState(false);

  const [decksHookExam, setDecksExam] = useState(examList)

  //MODAL CREATE EXAM
  //Date picker
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  // End Date picker

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [router, setRouter] = useState(useRouter());
  const [inputTextExam, setInputTextExam] = useState("");
  const [isChecked, setIsChecked] = React.useState<string[]>([])  //Options cochées

  async function submitExam() {
    var myDate = "" + selectedDate?.getDate() + "-" + selectedDate?.getMonth() + "-" + selectedDate?.getFullYear()
    var myDat = myDate.split("-");
    var newDate = new Date(parseInt(myDat[2]), parseInt(myDat[1]), parseInt(myDat[0]), 16, 13);
    const upload = await fetch(`http://localhost:3000/api/exams/create`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: inputTextExam,
          fk_user: "1w7K30BqJFTR6rJLKdAP9aasoKM2",
          decks: isChecked,
          date: newDate.getTime() 
        }),
      }).then(handleClose).then(refreshExams);
    <Alert severity="success">votre examen a bien été créé</Alert>


  }

  const refreshExams = async () => {


    const allExams = await fetch("http://localhost:3000/api/exams/findAll"); //à remplacer par findAllOfUser 
    const examList = await allExams.json();
    setDecksExam(examList);

  }

  const handleSingleCheck = (e: any) => {
    const option = e.target.getAttribute('value');;
    if (isChecked.includes(option)) {
      setIsChecked(isChecked.filter(checked_option => checked_option !== option))
    }
    else {
      isChecked.push(option);
      setIsChecked([...isChecked]);
    }
  }




  useEffect(() => {
    setDecks(deckData);
  }, [deckData])

  useEffect(() => {
    setDecksExam(examList);
  }, [examList])

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const changeSearch = (input: any) => {
    setInputText(input);
    console.log(input)
    const result = deckData.filter((item: { title: string; }) => item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
    setresult(result)
  }

  const changeSearchExam = (input: any) => {
    setInputText(input);
    console.log(input)
    const resultExam = examList.filter((item: { title: string; }) => item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
    setresultExam(resultExam)
  }


  return (
    <div>
      <main className={styles.main}>
        <div className={styles.gridTitle}>
          <h1 className={styles.title} style={{ color: "blue" }}>
            Gallerie de decks
          </h1>
          <HomeIcon />
        </div>


        <p className={styles.description}>
          voici votre gallerie de decks
        </p>
        <div className="wrapper-gallerie" >
          <div className="mydiv-1-gallerie" style={{ borderRadius: '20px' }}>
            <div style={{ minWidth: "100%" }}>
              <AppBar position="static" style={{ width: "100%", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="full width tabs example">
                  <Tab value="one" label="Mes Decks" wrapped {...a11yProps('one')} />
                  <Tab value="two" label="Exam" wrapped {...a11yProps('two')} />
                  <Tab value="three" label="Public Deck" wrapped {...a11yProps('three')} />
                </Tabs>
              </AppBar>

              <TabPanel value={value} index="one">
                <div style={{ float: 'left', width: "100%", textAlign: 'left' }}>
                  <Paper style={{ height: '45px' }}>
                    <InputBase
                      placeholder="Rechercher un deck"
                      style={{ margin: '7px 0 0 10px', width: '80%' }}
                    />
                    <IconButton type="submit" aria-label="search" style={{ float: 'right', textAlign: 'right' }}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </div>
                <div className="wrapper-deck">
                  {/* <DeckList>
                            {decksHook}
                        </DeckList> */}
                  <Card className={classes.root} style={{ padding: '1em' }}>
                    <img src="https://www.thesis.press/bandeau.png" object-fit="cover" style={{ height: '150px', width: '100%' }} />
                    <h1 style={{ color: 'blue' }}>
                      Créer un deck
                          </h1>
                    <Fab color="primary" aria-label="add">
                      <AddIcon />
                    </Fab>
                  </Card>
                  <Card className={classes.root}>
                    <img src="/montagne.jpg" object-fit="cover" style={{ height: '150px', width: '100%' }} />
                    <h2 style={{ color: 'blue' }}>
                      Géographie
                          </h2>
                    <h3>
                      Voici un super decks de carte sur des questions de géographie
                          </h3>
                    <Button variant="contained" color="primary">
                      PLAY
                          </Button>
                  </Card>

                  <Card className={classes.root}>
                    <img src="/montagne.jpg" object-fit="cover" style={{ height: '150px', width: '100%' }} />
                    <h2 style={{ color: 'blue' }}>
                      Géographie
                          </h2>
                    <h3>
                      Voici un super decks de carte sur des questions de géographie
                          </h3>
                    <Button variant="contained" color="primary">
                      PLAY
                          </Button>
                  </Card>

                  <Card className={classes.root}>
                    <img src="/montagne.jpg" object-fit="cover" style={{ height: '150px', width: '100%' }} />
                    <h2 style={{ color: 'blue' }}>
                      Géographie
                          </h2>
                    <h3>
                      Voici un super decks de carte sur des questions de géographie
                          </h3>
                    <Button variant="contained" color="primary">
                      PLAY
                          </Button>
                  </Card>
                  <Card className={classes.root}>
                    <img src="/montagne.jpg" object-fit="cover" style={{ height: '150px', width: '100%' }} />
                    <h2 style={{ color: 'blue' }}>
                      Géographie
                          </h2>
                    <h3>
                      Voici un super decks de carte sur des questions de géographie
                          </h3>
                    <Button variant="contained" color="primary">
                      PLAY
                          </Button>
                  </Card>
                  <Card className={classes.root}>
                    <img src="/montagne.jpg" object-fit="cover" style={{ height: '150px', width: '100%' }} />
                    <h2 style={{ color: 'blue' }}>
                      Géographie
                          </h2>
                    <h3>
                      Voici un super decks de carte sur des questions de géographie
                          </h3>
                    <Button variant="contained" color="primary">
                      PLAY
                          </Button>
                  </Card>
                  <Card className={classes.root}>
                    <img src="/montagne.jpg" object-fit="cover" style={{ height: '150px', width: '100%' }} />
                    <h2 style={{ color: 'blue' }}>
                      Géographie
                          </h2>
                    <h3>
                      Voici un super decks de carte sur des questions de géographie
                          </h3>
                    <Button variant="contained" color="primary">
                      PLAY
                          </Button>
                  </Card>
                  <Card className={classes.root}>
                    <img src="/montagne.jpg" object-fit="cover" style={{ height: '150px', width: '100%' }} />
                    <h2 style={{ color: 'blue' }}>
                      Géographie
                          </h2>
                    <h3>
                      Voici un super decks de carte sur des questions de géographie
                          </h3>
                    <Button variant="contained" color="primary">
                      PLAY
                          </Button>
                  </Card>
                  <Card className={classes.root}>
                    <img src="/montagne.jpg" object-fit="cover" style={{ height: '150px', width: '100%' }} />
                    <h2 style={{ color: 'blue' }}>
                      Géographie
                          </h2>
                    <h3>
                      Voici un super decks de carte sur des questions de géographie
                          </h3>
                    <Button variant="contained" color="primary">
                      PLAY
                          </Button>
                  </Card>
                </div>
              </TabPanel>

              <TabPanel value={value} index="two">
                <div style={{ float: 'left', width: "100%", textAlign: 'left' }}>
                  <Paper style={{ height: '45px' }}>
                    <InputBase
                      placeholder="Rechercher un examen"
                      value={inputText}
                      onChange={(e) => changeSearchExam(e.target.value)}
                      style={{ margin: '7px 0 0 10px', width: '80%' }}
                    />
                    <IconButton type="submit" aria-label="search" style={{ float: 'right', textAlign: 'right' }}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </div>
                <div className="wrapper-deck">

                  <div>
                    <Card className={classes.root} style={{ padding: '1em' }}>
                      <img src="https://www.thesis.press/bandeau.png" style={{ height: '150px', width: '100%', objectFit:"cover" }} />
                      <h2 style={{ color: 'blue' }}>
                        Créer un nouvel examen
                              </h2>
                      <Fab color="primary" aria-label="add" onClick={handleOpen}>
                        <a style={{ color: 'white' }}>
                          <AddIcon />
                        </a>
                      </Fab>
                    </Card>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open}>
                        <div className={classes.paper}>
                          <div >
                            <h1 style={{ color: 'blue' }}>
                              Créer un nouvel examen
                            </h1><br />
                            <h3 style={{ color: 'blue' }}>Choisissez la date de votre examen :</h3>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date du futur examen"
                                format="dd/MM/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }} />
                            </MuiPickersUtilsProvider>
                          </div>
                          <div>
                            <TextField id="standard-basic" label="Nom de l'examen" autoComplete="off" value={inputTextExam} onChange={(e) => setInputTextExam(e.target.value)} />
                          </div>

                          <div>
                            <p> </p>
                            <h3 style={{ color: 'blue' }}>Choisissez les decks à réviser pour cet examen : </h3>
                            <div style={{ float: 'left', width: "100%", textAlign: 'left' }}>
                              <Paper style={{ height: '45px' }}>
                                <InputBase
                                  placeholder="Rechercher un deck"
                                  value={inputText}
                                  onChange={(e) => changeSearch(e.target.value)}
                                  style={{ margin: '7px 0 0 10px', width: '80%' }}

                                />
                                <IconButton type="submit" aria-label="search" style={{ float: 'right', textAlign: 'right' }}>
                                  <SearchIcon />
                                </IconButton>
                              </Paper>
                            </div>
                            {decksHook.length > 0 ?
                              <div className="wrapper-deck">
                                {result.map(({ title, id, description }: any) => (
                                  <div key={id}>
                                    <FormControlLabel
                                      className={styles.optionsCard}
                                      value={id}
                                      control={<Checkbox color="primary" />}
                                      labelPlacement="end"
                                      label={title}
                                      onChange={handleSingleCheck}
                                      checked={isChecked.includes(id)} />
                                  </div>
                                ))}</div>
                              : null}
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <Button variant="contained" color="primary" onClick={submitExam}>
                              CREER
                            </Button>
                          </div>
                        </div>
                      </Fade>
                    </Modal>
                  </div>

                  <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                  </Backdrop>


                  {resultExam.map(({ title, id, exam_date, next_session }: any) => (
                    <div key={id} onClick={() => setLoading(true)} >
                      <Card className={classes.root}>
                        <div style={{ height: '200px' }}>
                          <img src="/montagne.jpg" style={{ height: '150px', width: '100%', objectFit:"cover" }} />
                          <h2 style={{ color: 'blue' }}>{title}</h2>
                        </div>
                        <div style={{ height: '100px', overflow: 'auto', padding: '1em' }}>
                          <p>Examen prévu le {getTime(exam_date)}</p>
                          <p>Prochaine séance: {
                            !next_session ?
                              "Commencez dès aujourd'hui"
                              :
                              (next_session) <= (new Date().getTime()) ?
                                "Dès aujourd'hui"
                                :
                                next_session > exam_date ?
                                  "Votre examen est passé"
                                  :
                                  getTime(next_session)
                          }</p>
                        </div>
                        <div style={{ height: '100px', padding: '1em' }}>

                          <Link as={`/exam/${id}`} href="/exam/[exam]" >
                            <Button variant="contained" color="primary">
                              <a style={{ color: 'white' }}>
                                PLAY
                                </a>
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </div>
                  ))}

                </div>
              </TabPanel>

              <TabPanel value={value} index="three">
                <div style={{ float: 'left', width: "100%", textAlign: 'left' }}>
                  <Paper style={{ height: '45px' }}>
                    <InputBase
                      placeholder="Rechercher un deck"
                      value={inputText}
                      onChange={(e) => changeSearch(e.target.value)}
                      style={{ margin: '7px 0 0 10px', width: '80%' }}

                    />
                    <IconButton type="submit" aria-label="search" style={{ float: 'right', textAlign: 'right' }}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </div>
                <div className="wrapper-deck">
                  {/* <DeckList>
                            {decksHook}
                        </DeckList> */}
                  <Card className={classes.root} style={{ padding: '1em' }}>
                    <img src="https://www.thesis.press/bandeau.png" style={{ height: '150px', width: '100%', objectFit:"cover"}} />
                    <h1 style={{ color: 'blue' }}>
                      Créer un deck
                          </h1>
                    <Fab color="primary" aria-label="add">
                      <AddIcon />
                    </Fab>
                  </Card>
                  {result.map(({ title, id, description,imageurl }: any) => (
                    <div key={id} >
                      <Link as={`/decks/details/${id}`} href="/decks/details/[decks]">
                      <Button>
                      <Card className={classes.root} style={{cursor:"pointer"}}>
                        <div style={{ height: '200px' }}>
                          {
                            imageurl.length<5? <img src="/montagne.jpg" style={{ height: '150px', width: '100%', objectFit:"cover" }} />
                            :
                            <img src={imageurl} style={{ height: '150px', width: '100%', objectFit:"cover" }} />
                          }
                          <h2 style={{ color: 'blue' }}>{title}</h2>
                        </div>
                        <div style={{ height: '100px', overflow: 'auto', padding: '1em' }}>
                          <h3>{description}</h3>
                        </div>
                        <div style={{ height: '100px', padding: '1em' }}>

                          <Link as={`/decks/${id}`} href="/decks/[decks]">
                            <Button variant="contained" color="primary">
                              <a style={{ color: 'white' }}>
                                PLAY
                                </a>
                            </Button>
                          </Link>
                        

                          
                            
                          
                        </div>
                      </Card>
                      </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </TabPanel>
            </div>
          </div>
          <div className="mydiv-2-gallerie" style={{ borderRadius: '20px' }}>
            <div style={{textAlign:'center'}}>
              <h2 style={{ color: 'blue' }}> Calendrier :</h2>
            </div>           
            <h4 style={{ color: 'blue' }}> Date : </h4>
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                type="date"
                defaultValue={date}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ verticalAlign: 'midle' }}
              />
            </form>
            <h4 style={{ color: 'blue' }}> Evènement à venir : </h4>
            {decksHookExam.map(({ title, id, exam_date, next_session }: any) => (
              <div key={id} onClick={() => setLoading(true)} >
                <Card className={classes.root2}>
                  <div className="wrapper-deck">
                    <div style={{width:'80%'}}>
                      <h2 style={{ color: 'blue' }}>{title}</h2>

                      <p>Examen prévu le {getTime(exam_date)}</p>
                      <p>Prochaine séance : {
                        !next_session ?
                          "Commencez dès aujourd'hui"
                          :
                          (next_session) <= (new Date().getTime()) ?
                            "Dès aujourd'hui"
                            :
                            next_session > exam_date ?
                              "Votre examen est passé"
                              :
                              getTime(next_session)
                      }</p>
                    </div>
                    <div>
                      <Link as={`/exam/${id}`} href="/exam/[exam]" >
                        <Button variant="contained" color="primary">
                          <a style={{ color: 'white' }}>
                            PLAY 
                                </a>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const allDecks = await fetch("http://localhost:3000/api/decks/findAll"); //à remplacer par findAllOfUser selon les tables du genre User_Rights
  const deckData = await allDecks.json();

  const allExams = await fetch("http://localhost:3000/api/exams/findAll"); //à remplacer par findAllOfUser 
  const examList = await allExams.json();

  const sessionUser = "1w7K30BqJFTR6rJLKdAP9aasoKM2"; //JEAN
  return {
    props: {
      deckData, sessionUser, examList
    }
  }
}