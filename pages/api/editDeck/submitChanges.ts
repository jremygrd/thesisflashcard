//Provide deck ID

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    //const {deck:deckData} = req.body;

    //Problème, postresql fais une différence entre les single et double quotes, là ou les double quotes sont 
    //détruites en passant en requête :(((
    //On doit reconstruire nos arrays

    req.body.answer.filter((checked_option: any) => checked_option !== "");
    req.body.bad_options.filter((checked_option: any) => checked_option !== "");

    var ans = '[';
    for(var i =0;i<req.body.answer.length;i++){
        ans = ans+"'"+doubleQuotes(req.body.answer[i])+"'";
    if (i != req.body.answer.length-1){ans+=","}
    }
    ans+=']'
    
    var bad = '[';
    for(var i =0;i<req.body.bad_options.length;i++){
        bad = bad+"'"+doubleQuotes(req.body.bad_options[i])+"'";
    if (i != req.body.bad_options.length-1){bad+=","}
    }
    bad+=']'

    if(ans == "[]"){ans = "['']"}
    if(bad == "[]"){bad = "['']"}
    var c = ""
    c+=`update cards set 
    question = '${doubleQuotes(req.body.question)}',
    tip = '${doubleQuotes(req.body.tip)}',
    answer = ARRAY ${ans},
    bad_options = ARRAY ${bad}
    where id = '${req.body.id}'`;


    try{
        const quest = await prisma.$queryRaw(c);

        res.status(201);//created
        res.json(quest);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in submitChanges"})       
    }finally{
        await prisma.$disconnect()

    }
    

    function doubleQuotes(str : string){
        str = str.replace("'","''")
        return str;
    }
}