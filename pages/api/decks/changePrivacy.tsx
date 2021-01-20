import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});


    try{

        const Private = await prisma.$queryRaw`UPDATE stacks set private = ${req.body.private}
        where (id = ${req.body.fk_deck}
        and fk_user = ${req.body.fk_user});`;

        res.status(201);//created
        res.json(Private);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured"})       
    }finally{
        await prisma.$disconnect()

    }
    
}