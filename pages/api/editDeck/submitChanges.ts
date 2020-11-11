//Provide deck ID

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    //const {deck:deckData} = req.body;

    //Problème, postresql fais une différence entre les single et double quotes, là ou les double quotes sont 
    //détruites en passant en requête :(((
    //On doit reconstruire nos arrays


    var ans = '[';

    for(var i =0;i<req.body.answer.length;i++){
    ans = ans+'"'+req.body.answer[i]+'"';
    if (i != req.body.answer.length-1){ans+=","}
    }
    ans+=']'
    
    var bad = '[';

    for(var i =0;i<req.body.bad_options.length;i++){
    bad = bad+'"'+req.body.bad_options[i]+'"';
    if (i != req.body.bad_options.length-1){bad+=","}
    }
    bad+=']'


    try{

        const quest = await prisma.$queryRaw`update cards set 
        question = ${req.body.question},
        tip = ${req.body.tip},
        answer = ${ans},
        bad_options = ${bad}
        where id = ${req.body.id}`

        res.status(201);//created
        res.json(quest);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in submitChanges"})       
    }finally{
        await prisma.$disconnect()

    }
    
}