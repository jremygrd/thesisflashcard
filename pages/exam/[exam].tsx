import React, { useState,useEffect } from 'react';
import next, { GetServerSideProps } from 'next';

import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import '../../styles/Home.module.css'
import CardQuizv2 from '../components/CardQuizv2';

import CardQuiz from '../components/CardQuiz';
import { ViewArraySharp } from '@material-ui/icons';

import nookies from 'nookies';
import { firebaseAdmin } from '../services/firebaseAdmin';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

export type Question = {
  id: string;
  question: string;
  answer : string[];
};



export default function Deck({cardsData,shuffled, examData,sessionUser,isLongTerme}:any){


    return (
    <div >
      <Head>
        {/* <title>FlashCards - {deckData.title}</title> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>      
        </h1>

        
        <CardQuizv2>
          {cardsData}
          {shuffled}
          {examData}
          {true}
          {isLongTerme}
          {sessionUser}
        </CardQuizv2>
      </main>
    </div>

    
  )

    
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const sessionUser = token.uid //JEAN 
    const  slug  = context.query.exam;

    const opts = {
      fk_deck:slug,
      fk_user : sessionUser
      };
      
    const examById = await fetch (`http://localhost:3000/api/exams/${slug}`,{
      method : 'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(opts)
    });
    const examData = await examById.json();
    
    
    var today = new Date().getTime();
    var examDate = examData.exam_date;
    var isLongTerme = false;
    if (examDate - today > 2*24*60*60 ){
      isLongTerme = true
    }
    const opts2 = {
      fk_deck:slug,
      fk_user : sessionUser,
      isLongTerme : isLongTerme};


    const setScores = await fetch (`http://localhost:3000/api/exams/updateScore`,{
      method : 'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(opts2)
    });

    const cardsByIds = await fetch (`http://localhost:3000/api/exams/cardsExam`,{
      method : 'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(opts2)
    });

    const cardsData = await cardsByIds.json();
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
        cardsData,shuffled,examData,sessionUser,isLongTerme
      }
    }
  }



  export const shuffle = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
  