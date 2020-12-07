//Provide deck ID

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    try{
        const cards = await prisma.$queryRaw`select cards.id from cards
        join cards_users cu on cards.id = cu.fk_card
    where id in (select fk_cardID from cards_stacks where fk_stackID in
            (select fk_stackID from exam_list where exam_list.fk_examId = ${req.body}))
    and cu.fk_user = '624d86f8-834d-4e3f-8488-c22dfdbaa15b'
    and cu.score <0.6`   

    const examupdate = await prisma.$queryRaw`update exam set cardsToDo = ${cards.length}
    where id = ${req.body}`

    res.status(201);//created
    res.json(cards.length);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in cards_stacks [id]"})       
    }finally{
        await prisma.$disconnect()

    }
    
}