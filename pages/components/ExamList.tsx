
import styles from '../../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import ModalCreateExam from './ModalCreateExam'

//MODAL CREATE EXAM
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 3,
      color: '#fff',
    },
  }),
);

//MODAL CREATE EXAM



const ExamList = ( examList:any) => {

    const [decks, setDecks] = useState([])
    const [decksHook, setDecksHook] = useState([])
    const [loading, setLoading] = React.useState(false);  

//MODAL CREATE EXAM
    //Date picker
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  // End Date picker

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [router,setRouter] = useState(useRouter());
  const [inputText,setInputText] = useState("");
  const [isChecked, setIsChecked] = React.useState<string[]>([])  //Options cochées

  async function submitExam(){
    var myDate = ""+selectedDate?.getDate()+"-"+selectedDate?.getMonth()+"-"+selectedDate?.getFullYear()
    var myDat = myDate.split("-");
    var newDate = new Date( myDat[2], myDat[1], myDat[0],16,13);
    const upload = await fetch(`http://localhost:3000/api/exams/create`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({title : inputText, 
              fk_user : "624d86f8-834d-4e3f-8488-c22dfdbaa15b",
              decks:isChecked,
              date : newDate.getTime()}),
          }).then(handleClose).then(refreshExams);


  }

  const refreshExams = async () =>{

    
    const allExams = await fetch ("http://localhost:3000/api/exams/findAll"); //à remplacer par findAllOfUser 
    const examList = await allExams.json();
    setDecks(examList);

  }

  const handleSingleCheck = (e:any) =>{  
    const option = e.target.getAttribute('value');;
    if (isChecked.includes(option)) {
        setIsChecked(isChecked.filter(checked_option => checked_option !== option))
    }
    else{
        isChecked.push(option);
        setIsChecked([...isChecked]);
    }
}

//END MODAL CREATE EXAM

    useEffect(() => {
      setDecks(examList.children[0])
      setDecksHook(examList.children[1])
    }, [examList])


    return (
      <>
        <div className={styles.addexam} key = "add">

          <div>
            <button type="button" onClick={handleOpen}>
              +
            </button>
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
                  <p>Choisissez la date de votre examen</p>
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
                    }}/>  
                  </MuiPickersUtilsProvider>            
                  </div>
                  <div>
                    <TextField id="standard-basic" label="Nom de l'examen" autoComplete="off" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
                  </div>

                  <div>
                    <p> </p>
                    <p>Choisissez les decks à réviser pour cet examen : </p>
                    {decksHook.length>0?
                    <>
                      {decksHook.map(({title,id,description}:any) => (
                        <div key = {id}>
                          <FormControlLabel
                              className = {styles.optionsCard}
                              value={id}
                              control={<Checkbox color="primary" />}
                              labelPlacement="end"
                              label={title}
                              onChange = {handleSingleCheck}
                              checked={isChecked.includes(id)}/>         
                        </div>
                      ))}</>
                    :null}
                  </div>

                  <input type="button" value="Valider" onClick={submitExam} />    
                </div>
              </Fade>
            </Modal>
          </div>
        </div>

        {decks?
        <>
          {decks.map(({title,id,exam_date,next_session}:any) => (
            <div className={styles.deck} key = {id} onClick = {()=>setLoading(true)}>
              <Link as = {`/exam/${id}`} href = "/exam/[exam]" >
              <a>
              <h3>{title} &rarr;</h3>
              <p>Examen prévu le {getTime(exam_date)}</p>
              <p>Prochaine séance: {
              !next_session ?
                "Commencez dès aujourd'hui"
                :
                getTime(next_session) <= getTime(new Date().getTime()) ?
                "Dès aujourd'hui"
                :
                next_session > exam_date ?
                "Votre examen est passé"
                :
                getTime(next_session)
              }</p>
              </a>    
              </Link>
            </div>
      ))}
      </>
      :null}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}
export default ExamList

function getTime(UNIX_timestamp:any){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();

  var time = date + ' ' + month + ' ' + year ;
  return time;
}