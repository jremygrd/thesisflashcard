

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient, StringFilter} from "@prisma/client";

// UNE PAGE POUR LOAD DES QUESTIONS RANDOM DANS LA DATABASE !!! !!! !!!
// UNE PAGE POUR LOAD DES QUESTIONS RANDOM DANS LA DATABASE !!! !!! !!!
// UNE PAGE POUR LOAD DES QUESTIONS RANDOM DANS LA DATABASE !!! !!! !!!
// UNE PAGE POUR LOAD DES QUESTIONS RANDOM DANS LA DATABASE !!! !!! !!!
// UNE PAGE POUR LOAD DES QUESTIONS RANDOM DANS LA DATABASE !!! !!! !!!

//CHANGER LE LIEN POUR LOAD DES QUESTIONS SPECIFIQUES
// cf :  https://opentdb.com/api_config.php

export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    const deck= await fetch (`https://opentdb.com/api.php?amount=20`);
    const deckData = await deck.json();

    //console.log(deckData)
    const questArray = deckData.results

    var entities = {
        'amp': '&',
        'apos': '\'',
        '#x27': '\'',
        '#x2F': '/',
        '#39': '\'',
        '#47': '/',
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'quot': '"',
        "#039":"'",
        "eacute":"é"
      }
      
      function decodeString (text:any) {
        return text.replace(/&([^;]+);/gm, function (match, entity) {
          return entities[entity] || match
        })
      }

    function formatAns(array:any){
    
    var ans = '[';
    for(var i =0;i<array.length;i++){
        ans = ans+"'"+decodeString(array[i])+"'";
        if (i != array.length-1){ans+=","}
    }
    ans+=']';
    return ans
    }

    function formatAns2(array:any){
        var ans = '[';
        ans = ans + '\'';
        for(var i =0;i<array.length;i++){
            ans = ans+array[i];
        }
        ans = ans + '\'';
        ans+=']';
        return ans
        }

    function decodeStringOld(str:string){
        const textArea = document.createElement('textarea')
        textArea.innerHTML = str
        return textArea.value
    }



    try{
        

        const uuidstack = create_UUID();

        const stack = await prisma.stacks.create({
            data:{
                id:uuidstack,
                title: decodeString(questArray[0].question.substring(0,15)),
                color:"none",
                emoji:"none",
                description:decodeString(questArray[0].category.substring(0,15)),

                users : {
                    connect :{
                        id : "624d86f8-834d-4e3f-8488-c22dfdbaa15b"
                    }
                }
            }
        })

    for(var i =0;i<questArray.length;i++){
        var c="";
        const uuid = create_UUID()
        c+=`Insert into cards values('${uuid}',
           '${decodeString(questArray[i].question)}',
           null,
           ARRAY ${formatAns(questArray[i].incorrect_answers)}, 
           ARRAY ${formatAns2(questArray[i].correct_answer)},
           '624d86f8-834d-4e3f-8488-c22dfdbaa15b')`
        const update= await prisma.$queryRaw(c);
        
        

        const cards_stacks = await prisma.cards_stacks.create({
            data:{
               
                cards : {
                    connect :{
                        id : uuid
                    }
                },
                stacks :{
                    connect :{
                        id : uuidstack
                    }
                }

            }
        })

        const cards_users = await prisma.cards_users.create({
            data:{
               nbgood:0,
               nbbad:0,
               streak:0,
               diff:1,
               lasttried:1605137172227,
               score:0.5,
               score_ct:0.5,
                cards : {
                    connect :{
                        id : uuid
                    }
                },
                users :{
                    connect :{
                        id : "624d86f8-834d-4e3f-8488-c22dfdbaa15b"
                    }
                }

            }
        })
    }
        res.status(201);//created
        res.json({questArray});
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in submitChanges"})       
    }finally{
        await prisma.$disconnect()

    }
}
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}