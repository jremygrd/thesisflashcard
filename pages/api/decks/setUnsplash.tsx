import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});


    try{
        console.log(req.body)

        const unsplash = await prisma.$queryRaw`UPDATE stacks set imageUrl = ${req.body.imageUrl}
        where (id = ${req.body.fk_deck}
        and fk_user = ${req.body.fk_user});`;

        res.status(201);//created
        res.json(unsplash);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured"})       
    }finally{
        await prisma.$disconnect()

    }
    
}