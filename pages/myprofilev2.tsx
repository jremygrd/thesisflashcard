import { Avatar, Box, Button, Card, Divider, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { sizing } from '@material-ui/system';
import ReactDOM from "react-dom";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import SwipeableViews from 'react-swipeable-views';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";
import EditIcon from '@material-ui/icons/Edit';
import nookies from 'nookies';
import { firebaseAdmin } from './services/firebaseAdmin';
import { firebaseClient } from './services/firebaseClient';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import PopUpdateMail from '../pages/components/PopUpdateMail';
import PopUpdatePassword2 from '../pages/components/PopUpdatePassword2';



import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    }),
  );





export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {
        const cookies = nookies.get(ctx);
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
        const myuser = await fetch("http://localhost:3000/api/users/" + token.uid);
        const userData = await myuser.json();
        return {
            props: {
                userData
            }
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/login',
            },
            props: {} as never,
        };
    }
};

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const updateUser = async (firstName: any, email: any,category:any, selectedDate:any, surname:any) => {
    var userAuth = firebaseClient.auth().currentUser;
    console.log(userAuth?.uid, firstName, email)
    var myuser = { myid: userAuth?.uid, name: firstName, email: email, type:category, birthdate: new Date(selectedDate).getTime(),surname:surname }
    const user = await fetch(
        `http://localhost:3000/api/users/edit`,
        {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(myuser),
        });
}


export default function profile({ userData }: any) {
    const [email, setEmail] = useState(userData[0].email);
    const [name, setName] = useState(userData[0].name);
    const [surname, setSurname] = useState(userData[0].surname);


    
    const [value, setValue] = React.useState(0);

    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const theme = useTheme();

    const [isOpenChangeMail, setisOpenChangeMail] = useState(false);
    const handleOpenMailEdit = () => {
        console.log("launched");
        setisOpenChangeMail(true);
    };
    var s = new Date(userData[0].birthdate)
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        s,
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const [category, setCategory] = React.useState(userData[0].type);

    const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as string);
    };


  const [openSucces, setOpenSucces] = React.useState(false);
  const [openError,setOpenError] = React.useState(false);
  const [myerrorText, setMyerrorText] = useState(''); 
  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

   setOpenError(false);
  };
  const handleCloseSucces = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSucces(false);
  };

    return (

        <div style={{ width: "100%", marginTop: '0px' }}>

            <Card elevation={5} style={{ width: '60%', margin: 'auto', marginTop: '50px', minWidth: '350px' }}>
                <div className="wrapper">
                    <div >
                        {/* <div style={{position:'relative', width:'80%', height:'0', paddingBottom:'80%', backgroundColor:'red' }}>
                            <Avatar alt="Tristan" src="pinguin.jpg" style={{width:'100%'}} />
                        </div> */}
                        <Avatar id='avatar' object-fit='none' alt="Tristan" src="pinguin.jpg" style={{ width: '100px', height: '100px', margin: '20px 20px 20px 40px' }} />
                    </div>
                    <div style={{ textAlign: 'left', marginTop: '15px', marginLeft: '10px' }}>
                        <h2 style={{ margin: '25px 0 0 0' }}>Mon profil</h2>
                        <div className="wrapper" style={{ marginTop: '8px' }}>
                            <CheckCircleIcon style={{ color: 'green' }} />
                            {/* <WarningIcon style={{color:'orange'}}/> */}
                            {/* <ErrorIcon style={{color:'red'}}/> */}
                            <Typography style={{ fontSize: '18px', marginLeft: '10px' }}>Profil complet</Typography>
                        </div>
                    </div>
                </div>
                <Divider variant="middle" style={{ height: '2px' }} />
                <div style={{ width: '90%', margin: 'auto' }}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChangeTab}
                        aria-label="disabled tabs example"

                    >
                        <Tab label="Informations personnelles" style={{ fontWeight: 'bold', textTransform: 'none' }} {...a11yProps(0)} />
                        <Tab label="Paramètres" style={{ fontWeight: 'bold', textTransform: 'none' }} {...a11yProps(1)} />
                    </Tabs>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <div className="wrapper" style={{ marginTop: '25px', paddingBottom: '60px' }}>
                                <div style={{ width: '50%', float: 'left', textAlign: 'left' }}>
                                    <TextField
                                        id="nameBox"
                                        label="Prénom"
                                        style={{ width: '85%', float: 'left' }}
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Date de Naissance"
                                            format="dd/MM/yyyy"
                                            value={selectedDate}
                                            style={{ width: '85%', marginTop: '35px' }}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>

                                </div>
                                <div style={{ width: '50%' }}>
                                {/* <TextField id="standard-basic" label="Nom de Famille" style={{ width: '85%', float: 'right' }} /> */}
                                    <TextField
                                        id="standard-basic"
                                        label="Nom de Famille"
                                        style={{ width: '85%', float: 'right' }}
                                        onChange={(e) => setSurname(e.target.value)}
                                        value={surname}
                                    />


                                    <FormControl style={{ width: '85%', float: 'right', textAlign: 'left', marginTop: '35px' }}>
                                        <InputLabel id="demo-simple-select-label">Je suis un(e)</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={category}
                                            onChange={handleChangeCategory}
                                        >
                                            <MenuItem value={"Étudiant"}>Étudiant</MenuItem>
                                            <MenuItem value={"Professeur"}>Professeur</MenuItem>
                                            <MenuItem value={"Particuler"}>Particuler</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="wrapper" style={{ width: '100%', paddingBottom: '20px' }}>
                                <div style={{ width: '100%' }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ float: 'right', marginLeft: '15px', marginRight: '5px' }}
                                        onClick={async () => {
                                            updateUser(name, email, category, selectedDate,surname);
                                            // setName((document.getElementById("nameBox") as HTMLInputElement).value);
                                            // userData.name = (document.getElementById("nameBox") as HTMLInputElement).value;
                                        }}
                                    >Enregistrer</Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ float: 'right' }}
                                        onClick={async () => {
                                            setName(userData.name);
                                            // (document.getElementById("nameBox") as HTMLInputElement).value = userData.name;
                                        }}
                                    >Annuler</Button>

                                </div>

                            </div>

                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <div className="wrapper" style={{ marginTop: '25px', paddingBottom: '60px' }}>
                                <div style={{ width: '50%', float: 'left', textAlign: 'left' }}>
                                    {/* <TextField id="standard-basic" label="Prénom" style={{ width: '85%', float: 'left' }} endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="change mail"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    } /> */}
                                    <FormControl style={{ width: '85%', float: 'left' }} >
                                        <InputLabel >Email</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            value={email}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="change mail"
                                                        onClick={handleOpenMailEdit}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <PopUpdateMail>
                                                        {isOpenChangeMail}{setisOpenChangeMail}{setOpenSucces}{setOpenError}{setMyerrorText}{setEmail}
                                                    </PopUpdateMail>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>

                                </div>
                                <div style={{ width: '50%' }}>
                                    <FormControl style={{ width: '85%', float: 'right' }} >
                                        <InputLabel >Mot de passe</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type="password"
                                            value="password123"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <PopUpdatePassword2/>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </TabPanel>
                    </SwipeableViews>
                </div>
            </Card>



            <div className={useStyles().root}>
                <Snackbar open={openSucces} autoHideDuration={6000} onClose={handleCloseSucces}>
                <Alert onClose={handleCloseSucces} severity="success">
                    Votre adresse mail a bien été changée
                </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">
                    {myerrorText}
                </Alert>
                </Snackbar>
            </div>



        </div>


    )
}