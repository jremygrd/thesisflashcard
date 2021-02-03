//Provide deck ID

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    //const {deck:deckData} = req.body;

    //Problème, postresql fais une différence entre les single et double quotes, là ou les double quotes sont 
    //détruites en passant en requête :(((
    //On doit reconstruire nos arrays
    req.body.question.answer.filter((checked_option: any) => checked_option !== "");
    req.body.question.bad_options.filter((checked_option: any) => checked_option !== "");

    var ans = '[';

    for(var i =0;i<req.body.question.answer.length;i++){
    ans = ans+"'"+doubleQuotes(req.body.question.answer[i])+"'";
    if (i != req.body.question.answer.length-1){ans+=","}
    }
    ans+=']'
    
    var bad = '[]';
    if( req.body.question.bad_options.length!=0){
         bad = '[';
        for(var i =0;i<req.body.question.bad_options.length;i++){
        bad = bad+"'"+doubleQuotes(req.body.question.bad_options[i])+"'";
        if (i != req.body.question.bad_options.length-1){bad+=","}
        }
        bad+=']'
    }


    //console.log('ans',ans,bad);
    const uuid = req.body.question.id//create_UUID();
    var c = ""

    c+=`insert into cards values ('${uuid}',
    '${doubleQuotes(req.body.question.question)}',
    '${doubleQuotes(req.body.question.tip)}',
    ARRAY ${bad}::text[],
    ARRAY ${ans}::text[],
    '${req.body.user}')`;


    //console.log(req.body);

    try{
    
        const stack= await prisma.$queryRaw(c);


        const cards_stacks = await prisma.cards_stacks.create({
            data:{
               
                cards : {
                    connect :{
                        id : uuid
                    }
                },
                stacks :{
                    connect :{
                        id : req.body.deck.id
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
                        id : req.body.user
                    }
                }

            }
        })



        res.status(201);//created
        res.json({uuid});
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in submitChanges"})       
    }finally{
        await prisma.$disconnect()

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


    function doubleQuotes(str : string){
        str = str.replace(/'/g,"''")
        return str;
    }
    
}