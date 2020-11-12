//Provide deck ID

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    try{
        //Juste retourner l'array d'ids :
        //const result = await prisma.$queryRaw`SELECT fk_cardid FROM cards_stacks WHERE fk_stackid = ${req.query.id.toString()};`
        //Retourner toutes les instances de cartes complètes
        //const result2 = await prisma.$queryRaw`SELECT * FROM cards WHERE id in (SELECT fk_cardid FROM cards_stacks WHERE fk_stackid = ${req.query.id})`;
        
        //Get by score - only first x rows
        const topx = await prisma.$queryRaw`select * from cardsV2`

        //console.log("TOOOOOOPXXX",topx);
        //console.log("result2",result2);

        res.status(201);//created
        res.json(topx);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in cards_stacks [id]"})       
    }finally{
        await prisma.$disconnect()

    }
    
}