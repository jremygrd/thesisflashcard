import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    try{
        const author = await prisma.$queryRaw`select name from users where id = 
        (select fk_user from stacks where id = ${req.body.fk_deck});`;

        res.status(201);//created
        res.json(author);
        
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured"})       
    }finally{
        await prisma.$disconnect()

    }
    
}