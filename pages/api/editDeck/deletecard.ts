//Provide deck ID

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    //const {deck:deckData} = req.body;

    //Problème, postresql fais une différence entre les single et double quotes, là ou les double quotes sont 
    //détruites en passant en requête :(((
    //On doit reconstruire nos arrays

    try{
        console.log(req.body)
        const quest = await prisma.$queryRaw(`delete from cards where id= '${req.body.id}' and fk_user='${req.body.fk_user}'`);

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