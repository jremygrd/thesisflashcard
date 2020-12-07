import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";



export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    try{
        const cards = await prisma.$queryRaw`select cards.id,question,tip,bad_options,answer,cards.fk_user,streak,nbGood,nbBad from cards
        join cards_users cu on cards.id = cu.fk_card
        where id in (select fk_cardID from cards_stacks where fk_stackID in
            (select fk_stackID from exam_list where exam_list.fk_examId = ${req.body.fk_deck}))
        and cu.fk_user = ${req.body.fk_user};` 
        

        res.json(cards);
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in api/decks/findAll.tsx"})       
    }finally{
        await prisma.$disconnect()

    }

}