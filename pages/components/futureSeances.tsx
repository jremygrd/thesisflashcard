import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import styles from '../../styles/Home.module.css'


export type Question = {
    id: string;
    question: string;
    answer : string[];
    tip : string;
    streak:number;
    nbGood:number;
    nbBad:number;

  };

    const FutureSeance = ( children:any) => {
    const sessionUser = "1w7K30BqJFTR6rJLKdAP9aasoKM2"

    const [deckId, setdeckId] = useState("");
    const [dataSession, setDataSession] = useState([]);

    useEffect(() => {   
        startQuiz(); 
    },[children]);




    //Initialisation
    const startQuiz = async () => { 

        getSeanceDate();
    }

    const getSeanceDate = async () =>{
        const  slug  = children.children.id;
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
        
        var sessions = {sess:{},cumulSess:{}}
        
        for(var i =0;i<len;i++){
            var day = 1
            while (getScore(cardsData[i],day)>0.4){
                day+=1;
            }
            var dayString = day.toString()
            if (!sessions.sess.hasOwnProperty(dayString))
            {
                sessions.sess[dayString] =1;
            }else{
                sessions.sess[dayString] +=1;
            }
           
        }

        
        var dayList = Object.keys(sessions.sess).sort(); 
        var sumOfCards = 0;
        var dataSession = []
        for(var i =0;i<dayList.length;i++){
            sumOfCards+=sessions.sess[dayList[i]];
            sessions.cumulSess[dayList[i]] = sumOfCards;

            dataSession.push({day:dayList[i],nbCards:sumOfCards})
        }
        setDataSession(dataSession);
        console.log("sessions",sessions)
        

    }
    



  return (   
    <div>
        {dataSession.length>0 ?
        <div>
        {dataSession.map((option:any)=>(
            <div key = {option.day}>
                <p key = {option.day}> Revenez dans {option.day} jours pour revoir {option.nbCards} cartes</p>     
            </div>
        ))}
        </div>
        :<div>Calcul des futures séances...</div>}
    </div>
  )
}


export default FutureSeance

function getScore(card:any, day:number) {
    var score = Math.exp(-day / (5 * card.streak/(card.nbgood+card.nbbad+1) + card.nbgood + 1))
    return score;
}