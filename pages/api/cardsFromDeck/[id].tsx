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


        const topx2 = await prisma.$queryRaw`select cards.id,question,tip,bad_options,answer,cards.fk_user,streak,streakct,nbGood,nbBad from cards
            join cards_users cu on cards.id = cu.fk_card
            join cards_stacks cs on cards.id = cs.fk_cardID
        where cs.fk_stackid = ${req.query.id}
        order by cu.score_ct,cu.score limit 20;`   

        res.status(201);//created
        res.json(topx2);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in cards_stacks/[id]"})       
    }finally{
        await prisma.$disconnect()

    }
    
}