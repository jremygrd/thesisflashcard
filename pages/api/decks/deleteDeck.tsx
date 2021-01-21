import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});


    try{
        var deleter = await prisma.$queryRaw`delete from stacks 
        where (id = ${req.body.deck.id}
        and fk_user = ${req.body.fk_user});`;

        var deleter2 = await prisma.$queryRaw`delete from stack_list 
        where (fk_stackID = ${req.body.deck.id}
        and fk_userID = ${req.body.fk_user});`;
        
        res.status(200);
        res.json(deleter2);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured"})       
    }finally{
        await prisma.$disconnect()

    }
    
}