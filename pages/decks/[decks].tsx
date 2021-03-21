import React, { useState,useEffect } from 'react';
import next, { GetServerSideProps } from 'next';

import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import '../../styles/Home.module.css'

import CardQuiz from '../components/CardQuiz';
import CardQuizv2 from '../components/CardQuizv2';

import nookies from 'nookies';
import { firebaseAdmin } from '../services/firebaseAdmin';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
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
          {sessionUser}
        </CardQuizv2>
      </main>
    </div>

    
  )

    
}



export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const sessionUser = token.uid
    const  slug  = context.query.decks;
    console.log(slug)
    const opts = {fk_deck:slug,
                  fk_user : sessionUser};
                  
    // const setScores = await fetch (`http://localhost:3000/api/cards_users/updateScore`,{
    //   method : 'post',
    //   headers:{'Content-Type':'application/json'},
    //   body: JSON.stringify(opts)
    // });


    const deckById = await fetch (`http://localhost:3000/api/decks/${slug}`,{
      method : 'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(opts)
    });
    const deckData = await deckById.json();

    const cardsByIds = await fetch (`http://localhost:3000/api/cards_stacks/${slug}`,{
      method : 'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(opts)
    });

    const cardsData = await cardsByIds.json();
    console.log(cardsData)
    const len = cardsData.length;

    
    var d = []
    var shuffled = []
    for(var i =0;i<len;i++){
      cardsData[i].bad_options = cardsData[i].bad_options.filter((x:any)=>x!="")
      cardsData[i].answer = cardsData[i].answer.filter((x:any)=>x!="")
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
  