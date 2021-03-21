import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState,useEffect } from 'react';
import DeckList from '../pages/components/DeckList'
import ExamList from '../pages/components/ExamList'
import ModalCreateDeck from './components/ModalCreateDeck2'
import ModalCreateExam from './components/ModalCreateExam'

import nookies from 'nookies';
import { firebaseAdmin } from './services/firebaseAdmin';
import { firebaseClient } from './services/firebaseClient';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Email } from '@material-ui/icons';


export default function Home({deckData,sessionUser,examList,userData}:any) {

  const [decksHook, setDecks] = useState(deckData)
  

  useEffect(() => {
    setDecks(deckData);
  }, [deckData])


  return (
    
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
        
          Welcome to <a href="https://thesis.press">Thesis x Flashcards!</a>
        </h1>

        <p className={styles.description}>
          It's very nice
        </p>

          <h2>Examens</h2>
          <div className={styles.grid}>
            <ExamList>
              {examList}
              {decksHook}
            </ExamList>
          </div>   

          <h2>Mes decks</h2>
          <div className={styles.grid}>
            <DeckList>
              {decksHook}
            </DeckList>
          </div>     

          <ModalCreateDeck>
            {sessionUser}
          </ModalCreateDeck>  



      </main>
        

      <footer className={styles.footer}>
        <a
          href="https://thesis.press"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vive Thesis
          
        </a>
      </footer>
    </div>
  )
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  try{

  
  const cookies = nookies.get(ctx);
  const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
  const myuser = await fetch ("http://localhost:3000/api/users/" + token.uid);
  const userData = await myuser.json();

  const allDecks = await fetch(
    `http://localhost:3000/api/decks/findAll`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id:token.uid}),
    }
  );

  //const allDecks = await fetch ("http://localhost:3000/api/decks/findAll"); //à remplacer par findAllOfUser selon les tables du genre User_Rights
  const deckData = await allDecks.json();


  const allExams = await fetch(
    `http://localhost:3000/api/exams/findAll`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id:token.uid}),
    }
  );
  //const allExams = await fetch ("http://localhost:3000/api/exams/findAll"); //à remplacer par findAllOfUser 
  const examList = await allExams.json();

  const sessionUser = token.uid; //JEAN
  return {
    props: {
      deckData,sessionUser,examList,userData
    }
  }
} catch (err) {
  return {
    redirect: {
      permanent: false,
      destination: '/login',
    },
    props: {} as never,
  };
}
}