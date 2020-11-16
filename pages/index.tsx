import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'reactjs-popup/dist/index.css';
import React, { useState,useEffect } from 'react';
import DeckList from '../pages/components/DeckList'
import TransitionsModal from './components/ModalCreateDeck'


export default function Home({deckData,sessionUser}:any) {
  
  
  return (
    
    <div className={styles.container}>
      <p>temp</p>
      <p>temp</p>
      <p>temp</p>
      <p>temp</p>

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

        <div className={styles.grid}>

          <DeckList>
          {deckData}
          </DeckList>

          <TransitionsModal>
            {sessionUser}
          </TransitionsModal>
          
        <div >         

          </div>
          
                   
        </div>
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


export async function getServerSideProps() {
  const allDecks = await fetch ("http://localhost:3000/api/decks/findAll"); //à remplacer par findAllOfUser selon les tables du genre User_Rights
  const deckData = await allDecks.json();
  const sessionUser = "624d86f8-834d-4e3f-8488-c22dfdbaa15b"; //JEAN
  return {
    props: {
      deckData,sessionUser
    }
  }
}