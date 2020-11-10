import React, { useState,useEffect } from 'react';
import next, { GetServerSideProps } from 'next';


import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import '../../styles/Home.module.css'
import { Console } from 'console';
export type Question = {
  id: string;
  question: string;
  answer : string[];
};



export default function Deck({cardsData,deckData,shuffled, sessionUser}:any){
  console.log(cardsData);
  console.log(shuffled);

  const [number, setNumber] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const TOTAL_QUESTIONS = cardsData.length;
  const [gameOver, setGameOver] = useState(true);
  const [flip, setFlip] = useState(false);
  const [isChecked, setIsChecked] = React.useState<string[]>([])
  const [submitted, setSubmitted] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);

  const startTrivia = async () => {
    setGameOver(false);
    setFlip(false);
    setSubmitted(false);
    setAnswerCorrect(false);
    setIsChecked([]);
    setNumber(0);
    setQuestions(cardsData);
    }



  const nextQuestion = () => {
    // Move on to the next question if not the last question
    postAnswer();
    setIsChecked([]);
    setFlip(false);
    setSubmitted(false);
    setAnswerCorrect(false);
    if (!gameOver){
      const nextQ = number + 1;
      setNumber(nextQ);
    }

    if (number+1 === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(number+1);
    }
  };

  const changeFlip = () =>{
    setFlip(!flip);

  }

  const postAnswer = () =>{

    const date = new Date();
    const opts = {status:answerCorrect,
                  date : date,
                  answerInputted:JSON.stringify({"array" : isChecked}),
                  fk_card : questions[number].id,
                  fk_user : sessionUser};

    //console.log(opts);
    const postdata = fetch ("http://localhost:3000/api/answers_cards/create",{
      method : 'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(opts)
    });

  }

  const submitFlip = ()=>{
    
    setFlip(!flip);

    if (!submitted){
      const answer = questions[number].answer;
      answer.sort();
      const isCheckedSorted = isChecked.sort();
      if (JSON.stringify(answer) === JSON.stringify(isCheckedSorted)){
        console.log(JSON.stringify(answer),JSON.stringify(isCheckedSorted));
        setAnswerCorrect(true);
      }
    }
    setSubmitted(true);

  }

  const handleSingleCheck = (e: { target: { getAttribute: (arg0: string) => any; }; }) =>{

    if(!submitted){
      const option = e.target.getAttribute('value');;
      if (isChecked.includes(option)) {
        setIsChecked(isChecked.filter(checked_option => checked_option !== option))
      }
      else{
        isChecked.push(option);
        setIsChecked([...isChecked]);
        //console.log(isChecked)
      }
    }
  }


    return (
    <div className={styles.main}>
      <Head>
        <title>FlashCards - {deckData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>      
          {deckData.title}
        </h1>




        <p className={styles.description}>
          {!gameOver? `${number+1}/${cardsData.length}` : ''}
        </p>

        <div className={`${styles.card} ${flip? `${styles.cardflip}`:''}`} >
        <div >
        {gameOver? <p>Start the game !</p> : 
          questions.length >0 && !gameOver ? 
          <div className = {styles.cardinner}>
              <div className = {styles.cardfront}>
                <h1>{questions[number].question}</h1> 
                  <div>{
                    shuffled[number].map((option:any)=>(
                      <div>
                        <p>
                        <input  type = "checkbox" 
                                value = {option}
                                name = {option}
                                checked={isChecked.includes(option)}
                                onChange={handleSingleCheck}
                                
                        />  {option}                     
                        </p>                   
                      </div>))
                      } <div className = {styles.main}>
                          <button className={styles.flipButton} onClick={submitFlip}>Flip</button></div>
                        </div>
                    </div>
                <div className = {styles.cardback}>
                  <h1>{flip? questions[number].question: ''}</h1> 
                  <div className = {styles.answerBack}>{               
                    questions[number].answer.map((option)=>(
                      <div>
                        <p id = {option}>{flip?  option : ''}</p>     
                      </div>
                    ))
                  }</div>
                  <h2 className = {styles.answerBack} >{flip? answerCorrect? "Correct answer !":"Bad answer :(": ''}</h2>
                <div className = {styles.container}>
                <button className={styles.flipButton} onClick={changeFlip}>Flip</button>
                </div>
              </div>
           
          </div>
          :null
        }
          <div className={styles.nextButton} onClick={gameOver ? startTrivia : nextQuestion}>
          {gameOver ? "Start" :submitted? "→" : ""}
          </div>
      </div>
      </div>

      </main>

    </div>

    
  )

    
}



export const getServerSideProps: GetServerSideProps = async context =>  {
    const sessionUser = "624d86f8-834d-4e3f-8488-c22dfdbaa15b" //JEAN 
    const  slug  = context.query.decks;



    const opts = {fk_deck:slug,
                  fk_user : sessionUser};
    const setScores = await fetch (`http://localhost:3000/api/cards_users/updateScore`,{
      method : 'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(opts)
    });


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
  