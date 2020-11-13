import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useState,useEffect } from 'react';
import { Redirect, useHistory,BrowserRouter } from "react-router-dom";
import {useRouter } from 'next/router'


export default function Home({deckData,sessionUser}) {


  
const [newDeckName, setNewDeckName] = useState("");
const [redirect, setRedirect] = useState();
const [router,setRouter] = useState(useRouter());

async function submitNewDeck(){
  const upload = await fetch(`http://localhost:3000/api/decks/create`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({title : newDeckName, fk_user : sessionUser}),
        }).then(res => res.json()).then( res=> redirectTo(res.uuidstack) );
        
}


const redirectTo = (uuidstack)=>{
  router.push(`/decks/edit/${uuidstack}`);
}
  

  return (
    
    <div className={styles.container}>
   
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>

        {deckData.map(({title,id,description}) => (
          <div className={styles.deck} >
            <Link as = {`/decks/${id}`} href = "/decks/[decks]">
            <a>
            <h3>{title} &rarr;</h3>
            <p>{description}</p>
            </a>     
            </Link>

            <Link as = {`/decks/edit/${id}`} href = "/decks/edit/[decks]">
            <a>
            <p>Edit deck</p>
            </a>     
            </Link>

          </div>
          ))}

          <div >

            <Link as = {`/decks/edit/new`} href = "/decks/edit/new">
            <a>
            <p>Create new deck</p>
            </a>     
            </Link>

            <Popup
            trigger={<button className="button"> Create new deck </button>}
            modal
            nested>
            {close => (
              <div className={styles.modal}>
                <button className={styles.close} onClick={close}>
                  &times;
                </button>
                <div className={styles.header}> Créer un deck ? </div>
                <div className={styles.content}>
                  {' '}
                  Enter deck name :
                  <input
                          type="text"
                          name="proposal"
                          id="proposal"
                          value={newDeckName}
                          onChange={(e) => setNewDeckName(e.target.value)}
                  />

                  <input type="button" value="debug" onClick={submitNewDeck} />
                  
                </div>
              </div>
            )}
          </Popup>

          </div>
          
                   
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}


export async function getStaticProps() {
  const allDecks = await fetch ("http://localhost:3000/api/decks/findAll"); //à remplacer par findAllOfUser selon les tables du genre User_Rights
  const deckData = await allDecks.json();
  const sessionUser = "624d86f8-834d-4e3f-8488-c22dfdbaa15b"; //JEAN
  return {
    props: {
      deckData,sessionUser
    }
  }
}