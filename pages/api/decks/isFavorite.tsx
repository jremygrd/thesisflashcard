import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});


    try{
        var isFavorite = await prisma.$queryRaw`select favorite from stack_list 
        where (fk_stackID = ${req.body.fk_deck}
        and fk_userID = ${req.body.fk_user});`;

        if (isFavorite.length ==0 )
        {
            isFavorite = [{favorite:false}]
        }
        
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