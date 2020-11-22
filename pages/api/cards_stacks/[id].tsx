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
        const topx = await prisma.$queryRaw`select * from cards where id in 
            (select fk_card from cards_users where fk_card in
            (select fk_cardid from cards_stacks where fk_stackID = ${req.query.id})
            and fk_user = ${req.body.fk_user} order by score asc limit 20);`

        const topx2 = await prisma.$queryRaw`select cards.id,question,tip,bad_options,answer,cards.fk_user,streak,nbGood,nbBad from cards
            join cards_users cu on cards.id = cu.fk_card
            join cards_stacks cs on cards.id = cs.fk_cardID
        where cs.fk_stackid = ${req.query.id}
        and cu.fk_user = ${req.body.fk_user}
        order by cu.score limit 20;`   

        res.status(201);//created
        res.json(topx2);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in cards_stacks [id]"})       
    }finally{
        await prisma.$disconnect()

    }
    
}