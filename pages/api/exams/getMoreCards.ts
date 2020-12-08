//Provide deck ID

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    try{
        const cards = await prisma.$queryRaw`select cards.id,question,tip,bad_options,answer,cards.fk_user,streak,streakct,nbGood,nbBad from cards
        join cards_users cu on cards.id = cu.fk_card
    where id in (select fk_cardID from cards_stacks where fk_stackID in
            (select fk_stackID from exam_list where exam_list.fk_examId = ${req.body.fk_deck}))
    and cu.fk_user = '1w7K30BqJFTR6rJLKdAP9aasoKM2'
    order by cu.score,cu.score_ct 
    limit 15;`   
 
    res.status(201);//created
    res.json(cards);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in cards_stacks [id]"})       
    }finally{
        await prisma.$disconnect()

    }
    
}