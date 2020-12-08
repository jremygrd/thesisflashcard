import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import styles from '../../styles/Home.module.css'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';

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
  }),
);

export default function ModalCreateExam(decks:any) {

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
              fk_user : "1w7K30BqJFTR6rJLKdAP9aasoKM2",
              decks:isChecked,
              date : newDate.getTime()}),
          }).then(handleClose);
    decks = decks;
  }

  const redirectTo = (uuidstack:any)=>{
    router.push(`/decks/edit/${uuidstack}`);
  }


  // var myDate = ""+selectedDate?.getDate()+"-"+selectedDate?.getMonth()+"-"+selectedDate?.getFullYear()
  // var myDat = myDate.split("-");
  // var newDate = new Date( myDat[2], myDat[1], myDat[0],16,13);
 
  // var date = new Date();

  // const diff = Math.abs(newDate.getTime()-date.getTime())
  // var diffe = diff/(1000*60*60*24);
  // diffe = Number((diffe).toFixed(2));

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


  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Create new exam
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
              {decks.children.length>0?
              <>
                {decks.children.map(({title,id,description}:any) => (
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
  );
}
