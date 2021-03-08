import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    
    try{
        const user = await prisma.users.create({
            data:{
                id:req.body.myid,
                name:req.body.name,
                email:req.body.email,
                surname:req.body.surname.lastName,
                type:'',
                birthdate:new Date().getTime(),
                rights:0
            }
        })


        res.status(201);//created
        res.json("Data submitted");
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in api/decks/users.tsx"})       
    }finally{
        await prisma.$disconnect()
    }
    
}
