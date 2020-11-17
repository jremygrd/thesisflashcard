import React, { useState, useEffect } from 'react'
import styles from '../../styles/Home.module.css'

export type Question = {
    id: string;
    question: string;
    answer : string[];
  };

const CardQuiz = ( children:any) => {
    
    const [sessionUser, setSessionUser] = useState("");
    const [shuffled, setShuffled] = useState([[]]);
    const [number, setNumber] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [totalQuests,setTotalQuests] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [flip, setFlip] = useState(false);
    const [isChecked, setIsChecked] = React.useState<string[]>([])
    const [submitted, setSubmitted] = useState(false);
    const [answerCorrect, setAnswerCorrect] = useState(false);
    const [cash, setCash] = useState("");
    
useEffect(() => {
    startTrivia();
},[children]);
      

const startTrivia = async () => {
  setGameOver(false);
  setFlip(false);
  setSubmitted(false);
  setAnswerCorrect(false);
  setIsChecked([]);
  setNumber(0);
  setTotalQuests(children.children[0].length)
  setQuestions(children.children[0]);
  setSessionUser(children.children[1]);
  setShuffled(children.children[2]);

}

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
      }
    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    postAnswer();
    setIsChecked([]);
    setFlip(false);
    setSubmitted(false);
    setAnswerCorrect(false);
    setCash("");
    if (!gameOver){
      const nextQ = number + 1;
      setNumber(nextQ);
    }

    if (number+1 === totalQuests) {
      setGameOver(true);
    } else {
      setNumber(number+1);
    }
  };

  return (    
    <div>
        <p className={styles.description}>
          {!gameOver? `${number+1}/${totalQuests}` : ''}
        </p>
        <div className={`${styles.card} ${flip? `${styles.cardflip}`:''}`} >
    <div >
        {gameOver? <p>Chargement</p> : 
          questions.length >0 && !gameOver ? 
          <div className = {styles.cardinner}>
              <div className = {styles.cardfront}>
                <h1>{questions[number].question}</h1> 
                  <div>{
                    shuffled[number].map((option:any)=>(
                      <div key = {option}>
                        <p key = {option}>
                        <input  type = "checkbox" 
                                value = {option}
                                name = {option}
                                checked={isChecked.includes(option)}
                                onChange={handleSingleCheck}                                                              
                        />  {option}                     
                        </p>                   
                      </div>))
                      } 
                          <input
                          type="text"
                          name="proposal"
                          id="proposal"
                          value={cash}
                          onChange={(e) => setCash(e.target.value)}
                          />

                        <div className = {styles.main}>
                          <button className={styles.flipButton} onClick={submitFlip}>Flip</button></div>
                        </div>
                    </div>
                <div className = {styles.cardback}>
                  <h1>{flip? questions[number].question: ''}</h1> 
                  <div className = {styles.answerBack}>{               
                    questions[number].answer.map((option:any)=>(
                      <div>
                        <p id = {option}>{flip?  option : ''}</p>     
                      </div>
                    ))
                  }</div>
                  <h2 className = {styles.answerBack} >{flip? answerCorrect? "Correct answer !":"Bad answer :( Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue ": ''}</h2>
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
    </div>
  )
}
export default CardQuiz