
import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    try{
        const topx2 = await prisma.$queryRaw`SELECT * FROM cards WHERE cards.id in (SELECT fk_cardid FROM cards_stacks WHERE fk_stackid = ${req.query.id});`
        res.status(201);//created
        res.json(topx2);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in allcards_stacks/[id]"})       
    }finally{
        await prisma.$disconnect()

    }
    
}