import React, { useState,useEffect } from 'react';
import { GetServerSideProps } from 'next';



import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import '../../styles/Home.module.css'
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

  const startTrivia = async () => {
    setGameOver(false);
    setFlip(false);
    setNumber(0);
    setQuestions(cardsData);
    }



  const nextQuestion = () => {
    // Move on to the next question if not the last question
    setIsChecked([]);
    setFlip(false);
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

  const submitFlip = () =>{
    setFlip(!flip);

    const date = new Date();
    const opts = {status:true,
                  date : date,
                  answerInputted:isChecked,
                  fk_card : questions[number].id,
                  fk_user : sessionUser};

    console.log(opts);
    const postdata = fetch ("http://localhost:3000/api/answers_cards/create",{
      method : 'post',
      body: JSON.stringify(opts)
    });


  }

  const handleSingleCheck = (e: { target: { getAttribute: (arg0: string) => any; }; }) =>{
    const option = e.target.getAttribute('value');;
    if (isChecked.includes(option)) {
      setIsChecked(isChecked.filter(checked_option => checked_option !== option))
    }
    else{
      isChecked.push(option);
      setIsChecked([...isChecked]);
      console.log(isChecked)
    }

  }

    return (
    <div className={styles.container}>
      <Head>
        <title>FlashCards - {deckData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>      
          {deckData.title}
        </h1>
          <button className='start' onClick={startTrivia}>
            Start
          </button>

          <button className='next' onClick={nextQuestion}>
            Next
          </button>

        <p className={styles.description}>
          Contient les cartes suivantes :
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
                      } <div className = {styles.container}>
                          <button className={styles.flipButton} onClick={submitFlip}>Flip</button></div>
                        </div>
                    </div>
                <div className = {styles.cardback}>
                <div>{               
                  questions[number].answer.map((option)=>(
                    <div>
                      <p>{flip?  option : ''}</p> 
                    </div>
                  ))
                }</div>
                <div className = {styles.container}>
                <button className={styles.flipButton} onClick={changeFlip}>Flip</button>
                </div>
              </div>
           
          </div>
          :null
        }
              
      </div>


      </div>


      </main>
    </div>
  )

    
}



export const getServerSideProps: GetServerSideProps = async context =>  {

    const  slug  = context.query.decks;
    const deckById = await fetch (`http://localhost:3000/api/decks/${slug}`);
    const deckData = await deckById.json();

    const cardsByIds = await fetch (`http://localhost:3000/api/cards_stacks/${slug}`);
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
        deckData,cardsData,shuffled
      }
    }
  }



  export const shuffle = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
  