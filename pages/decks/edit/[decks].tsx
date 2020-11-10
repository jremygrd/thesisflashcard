import React, { useState,useEffect, Component } from 'react';
import next, { GetServerSideProps } from 'next';
import Form from '../deckForm/form.tsx';

import Head from 'next/head'

import styles from '../../../styles/Home.module.css'
import '../../../styles/Home.module.css'

import { Console } from 'console';
import { start } from 'repl';
export type Question = {
  id: string;
  question: string;
  answer : string[];
  tip : string;
  bad_options: string[];
};





export default function Deck({cardsData,deckData,shuffled, sessionUser}:any){
  //console.log(cardsData);
  //console.log(shuffled);
  

  const [number, setNumber] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const TOTAL_QUESTIONS = cardsData.length;
  const [flip, setFlip] = useState(false);

  useEffect(()=>{
    startPage();
  });


  const startPage = async () => {
    setQuestions(cardsData);
   }


  const changeFlip = () =>{
    setFlip(!flip);
  };

  const changForm = (idx:any)=> {
    console.log(idx);
    setNumber(idx);
    setQuest(cardsData[idx].question);
    setTip(cardsData[idx].tip);
    setAnswers(cardsData[idx].answer);
    setBadOptions(cardsData[idx].bad_options);
    setAllOptions(cardsData[idx].answer.concat(cardsData[idx].bad_options));
  };


  const addCat = () => {
    const updatedCats = [...allOptions];
    if (updatedCats.includes("") == false){
      updatedCats.push("");
      setAllOptions(updatedCats);
    }
    
  };


  const [quest, setQuest] = useState(cardsData[number].question);
  const [tip, setTip] = useState(cardsData[number].tip);

  const [answers, setAnswers] = useState(cardsData[number].answer);
  const [bad_options, setBadOptions] = useState(cardsData[number].bad_options);
  const [allOptions,setAllOptions] = useState(cardsData[number].answer.concat(cardsData[number].bad_options));

  console.log("all",allOptions);
  console.log("bad",bad_options);
  console.log("ans",answers);

  function changeBad(idx:any,e:any,val:any){
    const updatedAll = [...allOptions];
    updatedAll[idx] = e.target.value;
    setAllOptions(updatedAll);


    const updatedCats = [...bad_options];
    idx = updatedCats.indexOf(val);
    updatedCats[idx] = e.target.value;
    setBadOptions(updatedCats);
  }

  function changeGood(idx:any,e:any,val:any){

    const updatedAll = [...allOptions];
    updatedAll[idx] = e.target.value;
    setAllOptions(updatedAll);

    console.log(val);
    const updatedCats = [...answers];
    idx = updatedCats.indexOf(val);
    updatedCats[idx] = e.target.value;
    setAnswers(updatedCats);
  }

  function handleCheckAnswer(val:any){
    if(answers.includes(val)){
      setAnswers(answers.filter((checked_option: any) => checked_option !== val))
      bad_options.push(val);
      setBadOptions([...bad_options]);
    }else{
      setBadOptions(bad_options.filter((checked_option: any) => checked_option !== val))
      answers.push(val);
      setAnswers([...answers]);
    }
  }

  function deleteOption(val:any){
    if(answers.includes(val) && allOptions.length > 1){
      setAnswers(answers.filter((checked_option: any) => checked_option !== val))
    }
    if(bad_options.includes(val) && allOptions.length > 1){
      setBadOptions(bad_options.filter((checked_option: any) => checked_option !== val))
    }
    if(allOptions.includes(val) && allOptions.length > 1){
      setAllOptions(allOptions.filter((checked_option: any) => checked_option !== val))
    }
  }

    return (
    <div className={styles.main} key = {number}>
      <Head>
        <title>FlashCards - {deckData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
      {
        questions.map((val, idx) => (
        <button onClick={() => changForm(idx)}>{val.question}</button>
        ))
      }
      </div>
      <main className={styles.main}>

        


        {/* <Form > 
          cardsData  = {cardsData},
          number = {number}
        </Form> */}

        <form key = {number}>
            <label htmlFor="owner">Question</label>
            <input
                type="text"
                name="owner"
                id="owner"
                value={quest}
                onChange={e => setQuest(e.target.value)}
            />
              
            <label htmlFor="description">Indice</label>
            <input
                type="text"
                name="description"
                id="description"
                value={tip}
                onChange={e => setTip(e.target.value)}
            />

            { 
                allOptions.map((val:any, idx:any) => (
                  <div>
                  <label htmlFor="description">Option </label>
                  <input
                      type="text"
                      name="description"
                      id="description"
                      value={val}
                      onChange={answers.includes(val) ? e => changeGood(idx,e,val): e => changeBad(idx,e,val)}
                      
                  />
                  <input
                      type="checkbox"
                      name="description"
                      id="description"
                      value={val}
                      checked={answers.includes(val)}
                      onChange={() => handleCheckAnswer(val)}
                      
                  />
                  <div onClick={() => deleteOption(val)}>Suppr</div> 
                  </div>
                ))
                }


            
            <input
                type="button"
                value="Add answer"
                onClick={addCat}
            />
          <p></p>
          <input type="submit" value="Submit" />
        </form>



      </main>
     </div>


    
  )

    
}

export const getServerSideProps: GetServerSideProps = async context =>  {
    const sessionUser = "624d86f8-834d-4e3f-8488-c22dfdbaa15b" //JEAN 
    const  slug  = context.query.decks;



    const opts = {fk_deck:slug,
                  fk_user : sessionUser};


    const deckById = await fetch (`http://localhost:3000/api/decks/${slug}`);
    const deckData = await deckById.json();

    const cardsByIds = await fetch (`http://localhost:3000/api/cards_stacks/${slug}`,{
      method : 'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(opts)
    });

    const cardsData = await cardsByIds.json();
    return {
      props: {
        deckData,cardsData,sessionUser
      }
    }
  }

