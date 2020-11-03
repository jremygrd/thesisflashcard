import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    try{
        //const {decka:deckData} = req.body;
        console.log(req['query']['id'].toString())
        const deck = await prisma.stacks.findOne({
            where:{
                id : req['query']['id'].toString(),
            }
            
        })


        res.status(201);//created
        res.json(deck);
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured"})       
    }finally{
        await prisma.$disconnect()

    }
    
}