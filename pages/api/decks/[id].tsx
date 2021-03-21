import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    try{
        const {decka:deckData} = req.body;
        // console.log(req['query']['id'].toString())
        // const deck = await prisma.stacks.findOne({
        //     where:{
        //         id : req['query']['id'].toString()
        //     }
            
        // })
         console.log(req.body)
         const deck = await prisma.$queryRaw`SELECT * from stacks 
         where (id = ${req.body.fk_deck}
             and fk_user = ${req.body.fk_user});`;
        res.status(201);//created
        console.log(deck)
        res.json(deck[0]);
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured"})       
    }finally{
        await prisma.$disconnect()

    }
    
}