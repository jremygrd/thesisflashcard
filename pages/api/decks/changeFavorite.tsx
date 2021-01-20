import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});


    try{
        const check = await prisma.$queryRaw`SELECT id from stack_list 
        where (fk_stackID = ${req.body.fk_deck}
            and fk_userID = ${req.body.fk_user});`;

        if(check.length==0)
            {
                const insert = await prisma.$queryRaw`INSERT INTO stack_list 
                VALUES (DEFAULT, ${req.body.fk_user},${req.body.fk_deck});`; 
            }

        const isFavorite = await prisma.$queryRaw`UPDATE stack_list set favorite = ${req.body.favorite}
        where (fk_stackID = ${req.body.fk_deck}
        and fk_userID = ${req.body.fk_user});`;

        res.status(201);//created
        res.json(isFavorite);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured"})       
    }finally{
        await prisma.$disconnect()

    }
    
}