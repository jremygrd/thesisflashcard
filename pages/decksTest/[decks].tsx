import React, { useState, useEffect, Component } from "react";
import next, { GetServerSideProps } from "next";
//import Form from "../deckForm/form.tsx";

import Head from "next/head";

import styles from "../../styles/Home.module.css";
import "../../styles/Home.module.css";

import { Console } from "console";
import { start } from "repl";


export default function Deck({
  cardsData,
  deckData,
  sessionUser,
}: any) {

  
  

  const [number, setNumber] = useState(0);
  
  const[thisCard,setThisCard] = useState(cardsData[number]);

  const[thisQuestion,setThisQuestion] = useState(cardsData[number].question);
  const[thisTip,setThisTip] = useState(cardsData[number].tip);

  const[answers,setAnswers] = useState(thisCard.answer);
  const[badOptions,setBadOption] = useState(thisCard.bad_options);
  const[allOptions,setAllOptions] = useState(answers.concat(badOptions));

  console.log(cardsData);


  useEffect(() => {
    setThisQuestion(cardsData[number].question);
    setThisTip(cardsData[number].tip);

    thisCard.tip = thisTip;   
    thisCard.question = thisQuestion;
    setThisCard(thisCard);

    console.log("yo");
  },[number,cardsData]);

  

  function changeQuest(idx:any){
    setNumber(idx);
    console.log(idx);
  }


  function print(){
    console.log(cardsData[number].id);
    
  }



  function addCard(){
    const updateQuestions = cardsData
    const blank = {
      id: "new",
      question: "",
      tip: "",
      bad_options: ["","",""],
      answer: [""],
      fk_user: sessionUser,
    };

  }



  return (
    <div className={styles.main} key={number}>
      <Head>
        <title>FlashCards - {deckData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {cardsData.map((val, idx) => (
          <p onClick={() => changeQuest(idx)}>{val.question}</p>
        ))}
      </div>
      <div onClick={() => addCard()}>Ajouter une carte</div>


      <main className={styles.main}>
        <form key="formAnswers">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            name="question"
            id="question"
            value={thisQuestion}
            onChange={(e) => setThisQuestion(e.target.value)}
          />

          <label htmlFor="description">Indice</label>
          <input
            type="text"
            name="description"
            id="description"
            value={thisTip}
            onChange={(e) => setThisTip(e.target.value)}
          />

          {allOptions.map((val: any, idx: any) => (
            <div>
              <label htmlFor="description">Option </label>
              <input
                type="text"
                name="description"
                id="description"
                value={val}
                onChange={
                  answers.includes(val)
                    ? (e) => changeGood(idx, e, val)
                    : (e) => changeBad(idx, e, val)
                }
              />
              <input
                type="checkbox"
                name="description"
                id="description"
                value={val}
                checked={answers.includes(val)}
                onChange={() => handleCheckAnswer(val)}
              />
              <div >Suppr</div>
            </div>
          ))}

          <input type="button" value="Add answer" 
          //onClick={addCat} 
          />
          <p></p>
          <input type="button" value="Sauvegarder" />
          <input type="button" value="debug" onClick={print} />
        </form>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionUser = "624d86f8-834d-4e3f-8488-c22dfdbaa15b"; //JEAN
  const slug = context.query.decks;

  const opts = { fk_deck: slug, fk_user: sessionUser };

  const deckById = await fetch(`http://localhost:3000/api/decks/${slug}`);
  const deckData = await deckById.json();

  const cardsByIds = await fetch(
    `http://localhost:3000/api/cards_stacks/${slug}`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
    }
  );

  const cardsData = await cardsByIds.json();
  return {
    props: {
      deckData,
      cardsData,
      sessionUser,
    },
  };
};
