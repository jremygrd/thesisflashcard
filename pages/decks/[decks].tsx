import React, { useState,useEffect } from 'react';
import next, { GetServerSideProps } from 'next';

import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import '../../styles/Home.module.css'

import CardQuiz from '../components/CardQuiz';
import CardQuizv2 from '../components/CardQuizv2';

export type Question = {
  id: string;
  question: string;
  answer : string[];
};



export default function Deck({cardsData,deckData,shuffled, sessionUser}:any){
 


    return (
    <div >
      <Head>
        <title>FlashCards - {deckData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>      
          {deckData.title}
        </h1>
        
        <CardQuizv2>
          {cardsData}
          {shuffled}
          {deckData}
          {false} 
          {false}
        </CardQuizv2>
      </main>
    </div>

    
  )

    
}



export const getServerSideProps: GetServerSideProps = async context =>  {
    const sessionUser = "1w7K30BqJFTR6rJLKdAP9aasoKM2" //JEAN 
    const  slug  = context.query.decks;


    const opts = {fk_deck:slug,
                  fk_user : sessionUser};
                  
    // const setScores = await fetch (`http://localhost:3000/api/cards_users/updateScore`,{
    //   method : 'post',
    //   headers:{'Content-Type':'application/json'},
    //   body: JSON.stringify(opts)
    // });


    const deckById = await fetch (`http://localhost:3000/api/decks/${slug}`);
    const deckData = await deckById.json();

    const cardsByIds = await fetch (`http://localhost:3000/api/cards_stacks/${slug}`,{
      method : 'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(opts)
    });

    const cardsData = await cardsByIds.json();
    const len = cardsData.length;

    
    var d = []
    var shuffled = []
    for(var i =0;i<len;i++){
      d = (cardsData[i].bad_options.concat(cardsData[i].answer));
      shuffled.push(shuffle(d))
      d = []
    }

  
    return {
      props: {
        deckData,cardsData,shuffled,sessionUser
      }
    }
  }



  export const shuffle = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
  