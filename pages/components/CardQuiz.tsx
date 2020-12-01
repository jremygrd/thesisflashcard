import React, { useState, useEffect } from 'react'
import styles from '../../styles/Home.module.css'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddIcon from '@material-ui/icons/Add';
import ReportIcon from '@material-ui/icons/Report';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import CreateIcon from '@material-ui/icons/Create';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TextField from '@material-ui/core/TextField';
import Indice from './Indice';
import FutureSeance from './futureSeances';
import ReplayIcon from '@material-ui/icons/Replay';

export type Question = {
    id: string;
    question: string;
    answer : string[];
    tip : string;
    streak:number;
    nbGood:number;
    nbBad:number;

  };

const CardQuiz = ( children:any) => {
    const option = "Test"
    const sessionUser = "1w7K30BqJFTR6rJLKdAP9aasoKM2"

    const [shuffled, setShuffled] = useState([[]]); //Les réponses possibles mélangées 
    const [questions, setQuestions] = useState<Question[]>([]); //le Json des cartes montrées à l'user
    const [totalQuests,setTotalQuests] = useState(0);   //nb total de questions chargées
    const [noMoreCards, setNoMoreCards] = useState(true);   //S'il n'y a plus de carte à montrer

    const [submitted, setSubmitted] = useState(false);  //Si la réponse a déjà été submit au serveur
    const [answerCorrect, setAnswerCorrect] = useState(false);  // Si la réponse est correct ou non

    const [flip, setFlip] = useState(false);    //Tourner la carte
    const [plusButton, setPlusButton] = useState(false);    //Ouvrir les options
    const [checkboxes, setCheckboxes] = useState(false);    //Afficher le QCM
    const [isChecked, setIsChecked] = React.useState<string[]>([])  //Options cochées
    const [inputText, setInputText] = useState(""); //La réponse que l'user a écrit

    const [number, setNumber] = useState(0);    //Numéro de la carte
    const [indiceOpened, setIndiceOpened] = useState(false);    //Savoir si l'indice a été ouvert

    // Quand children est chargé, lancer le quiz (i.e. au chargement du composant)
    useEffect(() => {   
        startQuiz(); 
    },[children]);

    //Quand isChecked est actualisé, le réactualiser 
    //(fix bug pour upload la réponse avec le flip ?)
    useEffect(() => {   
        setIsChecked(isChecked);
    },[isChecked]);

    useEffect(() => {   
        setAnswerCorrect(answerCorrect);
    },[answerCorrect]);



    //Initialisation
    const startQuiz = async () => { 
        setAnswerCorrect(false);
        setNoMoreCards(false);
        setFlip(false);
        setSubmitted(false);
        setAnswerCorrect(false);
        setIsChecked([]);
        setNumber(0);
        setTotalQuests(children.children[0].length);
        setQuestions(children.children[0]);
        setShuffled(children.children[1]); 
    }

    //Ouvir le bouton +
    const switchPlusButton = ()=>{  
        setPlusButton(!plusButton); 
    }

    // true = Afficher le QCM / false l'input
    const switchCheckboxes = ()=>{  
        if (!submitted)
        {
            setCheckboxes(!checkboxes); 
        }
        
    }

    //Upload la réponse de l'user
    const postAnswer = (isCorrect:boolean) =>{  
    const date = new Date();
    var answer = null;
    if(checkboxes){
        answer = isChecked
    }else{
        answer = inputText
    }
    const opts = {status:isCorrect,
                date : date,
                answerInputted:JSON.stringify({"answerInputted" : answer}),
                fk_card : questions[number].id,
                fk_user : sessionUser,
                indiceOpened:indiceOpened,
                qcmOpened : checkboxes};

        const postdata = fetch ("http://localhost:3000/api/answers_cards/create",{
            method : 'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(opts)
        });

        
    }

    //Tourner la carte, conditions si c'est la 1ère fois pour ne pas upload 2fois, 
    //calcul de si la réponse est bonne
    const submitFlip = ()=>{
    
    setFlip(!flip);
    if (!submitted){
        var isCorrect = false;
        if (checkboxes){
            const answer = questions[number].answer;
            answer.sort();
            const isCheckedSorted = isChecked.sort();
            if (JSON.stringify(answer) === JSON.stringify(isCheckedSorted)){
              setAnswerCorrect(true);
              isCorrect = true

            }
        }else{
            const levenshteinDist = (levenshtein(String(inputText).toUpperCase(),String(questions[number].answer).toUpperCase()))
            if (levenshteinDist < String(inputText).length/3){
                setAnswerCorrect(true);
                isCorrect = true
            }else{setAnswerCorrect(false)}
        }
        setSubmitted(true); 
         setTimeout(() => {
       postAnswer(isCorrect) ; },800)
    
    }
    
  }

    //Réinitialisation, passage à la question suivante
    const nextQuestion = () => {
        // Move on to the next question if not the last question

        setCheckboxes(false);
        setFlip(false);
        setIsChecked([]);
        setFlip(false);
        setSubmitted(false);
        setAnswerCorrect(false);
        setInputText("");
        setIndiceOpened(false);
        if (!noMoreCards){
        const nextQ = number + 1;
        setNumber(nextQ);
        }

        if (number+1 === totalQuests) {
        setNoMoreCards(true);
        } else {
        setNumber(number+1);
        }
    };

    //Gérer un checkbox check
    const handleSingleCheck = (e:any) =>{  
        {setCheckboxes(true)}
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

    //Permettre à l'user de charger plus de questions. 
    //Recalcul des scores avec les cartes jouées + import des nouvelles
    const fetchMore = async ()=>{

    const  slug  = children.children[2].id;
    const opts = {fk_deck:slug,
        fk_user : sessionUser};

    const setScores = await fetch (`http://localhost:3000/api/cards_users/updateScore`,{
        method : 'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(opts)
      });
    
    const cardsByIds = await fetch (`http://localhost:3000/api/cards_stacks/${slug}`,{
        method : 'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(opts)
      });
  
      const cardsData = await cardsByIds.json();
      const len = cardsData.length;
  
      var d = []
      var newshuffled = []
      for(var i =0;i<len;i++){
        d = (cardsData[i].bad_options.concat(cardsData[i].answer));
        newshuffled.push(shuffle(d))
        d = []
      }

      const appended = questions.concat(cardsData)
      setQuestions(appended)
      

      const appendedShuffled = shuffled.concat(newshuffled) //Erreur signalée mais fonctionne très bien
      setTotalQuests(appended.length)
      setShuffled(appendedShuffled);
      setNoMoreCards(false);
  }


  return (    
    <div className = {styles.cardAroundSettings}>
        
        {/* Ne charger que si la question est chargée */}
        {questions[totalQuests-1]?
        <>
            {!noMoreCards?
            <>
                <div className = {flip?styles.flipme:""}>
                    <div className = {styles.wrapperCard}>
                        <div className = {styles.carda} >
                            <div className= {styles.cardaface}>
                                <p className={styles.description}>
                                {!noMoreCards? `${number+1}/${totalQuests}` : ''}
                            </p>
                                <div className={styles.QuestionCard}> {questions[number].question} </div>
                                {/* Choisir entre l'affichage checkbox ou input */}
                                {questions[number].streak<3 ? // Choisir quand montrer le QCM par défaut
                                <div className={styles.checkboxesCard}>
                                    {shuffled[number].map((option:any)=>(
                                    <p key = {option}>
                                        <FormControlLabel
                                        className = {styles.optionsCard}
                                        value={option}
                                        control={<Checkbox color="primary" />}
                                        label={option}
                                        labelPlacement="end"
                                        onChange = {handleSingleCheck}
                                        checked={isChecked.includes(option)}
                                        />
                                    </p>))}
                                </div>
                                :
                                <div className = {styles.inputAnswerCard}>
                                    <TextField id="standard-basic" label="Réponse" autoComplete="off" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
                                </div>
                                }
                            </div>
                            <div className=  {`${styles.cardaback}`}>
                                <div className = {styles.insidecardaback}>
                                <p className={styles.description}>
                                    {!noMoreCards? `${number+1}/${totalQuests}` : ''}
                                </p>
                                    {submitted?<>
                                        <div className={styles.QuestionCard}> {questions[number].question} </div>
                                        <div className = {styles.answerBack} >
                                            {submitted? answerCorrect? 
                                            <h2 className = {styles.goodAnswerText}>Bonne réponse !</h2>
                                            :
                                            <h2 className = {styles.badAnswerText}>Mauvaise réponse</h2>: null}
                                        </div>
                                        <div className={styles.descriptionCard}>
                                            <div>Bonne réponse :</div>
                                            {questions[number].answer.map((option:any)=>(
                                            <div key = {option}>
                                                <li key = {option}>{submitted?  option : ''}</li>     
                                            </div>
                                            ))}
                                            </div>
                                        <p className={styles.descriptionCard}>Hi there! This is the description of the answer that the creator of the card might have written</p>
                                    </>:null}
                                </div>
                                <button className={styles.btnCardBack}  onClick={submitFlip}>Flip</button>
                            </div>
                            <button className={styles.btnCard}  onClick={submitFlip}>Flip</button>
                        </div>            
                    </div>

                </div>
                <div className = {styles.sideButtons}>
                    {checkboxes?
                    <IconButton aria-label="grid" onClick = {switchCheckboxes}>
                        <TextFieldsIcon fontSize="small"/>
                    </IconButton>
                    : 
                    <IconButton aria-label="grid" onClick = {switchCheckboxes}>
                        <FormatListBulletedIcon fontSize="small"/>
                    </IconButton>
                    }
                    <div onClick = {()=>setIndiceOpened(true)}>
                        <Indice > {questions[number].tip} </Indice>
                    </div>

                    <IconButton aria-label="grid"  onClick = {switchPlusButton} >
                        <AddIcon fontSize="small"/>
                    </IconButton>

                    {plusButton?
                    <>
                    <IconButton aria-label="grid" >
                        <PlaylistAddIcon fontSize="small"/>
                    </IconButton>
                    <IconButton aria-label="grid" >
                        <ReportIcon fontSize="small"/>
                    </IconButton>
                    <IconButton aria-label="grid" >
                        <CreateIcon fontSize="small"/>
                    </IconButton>
                    </>            
                    :null
                    
                    }
                </div>
                <div className = {styles.nextCardButton}>
                    <IconButton aria-label="grid"  onClick={nextQuestion}>
                        <NavigateNextIcon fontSize="small"/>
                    </IconButton>
                </div>
            </>:
            <div className={styles.carda}>
                <div className={styles.descriptionCard}>Séance de révision terminée !</div>
                <div className={styles.descriptionCard}>Vous avez fini les cartes que vous deviez revoir aujourd'hui !</div>
                
                <div>
                    <FutureSeance>
                        {children.children[2]}
                    </FutureSeance>
                </div>

                <div className={styles.descriptionCard}>Si vous le souhaitez vous pouvez néanmoins continuer pour prendre de l'avance</div>
                
                <button className={styles.btnCard}  onClick={fetchMore}>Continuer</button>

                <div className = {styles.sideButtons}>
                    <IconButton aria-label="grid" onClick = {startQuiz}>
                        <ReplayIcon fontSize="small"/>
                    </IconButton>
                </div>
               


            </div>}
        </>
        :<div>Loading...</div>}
    </div>
  )
}
export default CardQuiz

export const shuffle = (array: any[]) =>
[...array].sort(() => Math.random() - 0.5);


function levenshtein(a:String, b:String) {
    if(a.length === 0) return b.length;
    if(b.length === 0) return a.length;
  
    var matrix = [];
  
    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }
  
    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }
  
    return matrix[b.length][a.length];
  }