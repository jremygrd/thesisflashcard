import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";



export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    try{
        const {user:userData} = req.body;
        const user = await prisma.users.findOne({
            where:{
                id : userData.id,
            }
            
        })


        res.status(201);//created
        res.json(user);
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured "})       
    }finally{
        await prisma.$disconnect()

    }
    
    res.json({decks:"Done"});
    
}