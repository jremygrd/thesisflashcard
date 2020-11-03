import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";



export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    try{
        const {deck:deckData} = req.body;
        const deck = await prisma.stacks.findOne({
            where:{
                id : deckData.id,
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