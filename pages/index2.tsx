import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState,useEffect } from 'react';
import DeckList from '../pages/components/DeckList'
import ExamList from '../pages/components/ExamList'
import ModalCreateDeck from './components/ModalCreateDeck'
import ModalCreateExam from './components/ModalCreateExam'
import Link from 'next/link';

export default function Home({deckData}:any) {
  

  const [decksHook, setDecks] = useState(deckData)
  const [result, setresult] = useState([])
  const [inputText, setInputText] = useState('')
  
  
  const changeSearch = (input: any) =>{
    setInputText(input);
    console.log(input)
    const result = deckData.filter((item: { title: string; })  => item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
      setresult(result)

  }

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

          <h2>Recherche</h2>
          <div >
            <input className={styles.search} id="searchInput" type="search" placeholder="search .." value={inputText} onChange={(e) => changeSearch(e.target.value)}/>
            <div id="suggestions">

            </div>
            {result.map(({title,id,description}:any) => (
          <div className={styles.deck} key = {id} >
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

  
  return {
    props: {
      deckData
    }
  }
}