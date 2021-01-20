import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});


    try{
        var keywords = await prisma.$queryRaw`select keyword from keywords_stacks 
        where (fk_stackID = ${req.body.fk_deck});`;
        
        res.status(201);//created
        res.json(keywords);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured"})       
    }finally{
        await prisma.$disconnect()

    }
    
}