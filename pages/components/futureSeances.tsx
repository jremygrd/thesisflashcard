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
    const sessionUser = "624d86f8-834d-4e3f-8488-c22dfdbaa15b"

    const [deckId, setdeckId] = useState("");
    const [dataSession, setDataSession] = useState([]);
    const [newseance, setNewSeance] = useState(new Date().getTime());

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
            
        const setScores = await fetch (`http://localhost:3000/api/exams/updateScore`,{
            method : 'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(opts)
        });
        
        const cardsByIds = await fetch (`http://localhost:3000/api/exams/getAllCards/`,{
            method : 'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(opts)
        });
        const cardsData = await cardsByIds.json();
        const len = cardsData.length;
        
        var sessions = {sess:{},cumulSess:{}}
        
        for(var i =0;i<len;i++){
            var day = 1
            while (getScore(cardsData[i],day)>0.6){
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

        if(dataSession.length > 3){
            console.log('hourra')
            var smalldataSession = []
            const maxCards = dataSession[dataSession.length-1].nbCards

            var step1 = false
            var step2 = false
            var step3 = false
            for(var i =0;i<dataSession.length;i++){
                if(maxCards < 20){
                    if(i>dataSession.length/4 && !step1){
                        step1 = true
                        smalldataSession.push(dataSession[i])
                    }
                    if(i>dataSession.length/2 && !step2){
                        step2 = true
                        smalldataSession.push(dataSession[i])
                    }
                    if(i>dataSession.length/2 && !step3){
                        step3 = true
                        smalldataSession.push(dataSession[i])
                    }
                }
                else{
                    if(dataSession[i].nbCards > 10 && i!= 0 && !step1){
                        step1 = true
                        smalldataSession.push(dataSession[i-1])
                    }
                    if(dataSession[i].nbCards > 25 && i!= 0  && !step2){
                        step2 = true
                        smalldataSession.push(dataSession[i-1])
                    }
                    if(dataSession[i].nbCards > 45 && i!= 0  && !step3){
                        step3 = true
                        smalldataSession.push(dataSession[i-1])
                    }
                }
                

            }
            setDataSession(dataSession);
        }
        

    }
    
    const formatNewSeance = async (day:any) => {
        
        var today = new Date().getTime()
        console.log(getTime(today),day)
        today += 1000*60*60*24*day
        console.log(getTime(today),day)
        
        const  slug  = children.children.id;
        const opts = {fk_deck:slug,
            fk_user : sessionUser,
            newseance : today};
            
        const setNewSeance = await fetch (`http://localhost:3000/api/exams/setNewSeance`,{
            method : 'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(opts)
        });
    }



  return (   
    <div>
        {dataSession.length>0 ?
        <div>
        {dataSession.map((option:any)=>(
            <div key = {option.day}>
                <button className={styles.buttonseance} key = {option.day} onClick = {()=>formatNewSeance(option.day)}> 
                Revenez dans {option.day} jours pour revoir {option.nbCards} cartes</button>    
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

function getTime(UNIX_timestamp:any){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
  
    var time = date + ' ' + month + ' ' + year ;
    return time;
  }