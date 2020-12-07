import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    try{
        const user = await prisma.users.update({
            data:{
                id:req.body.myid,
                name:req.body.name,
                email:req.body.email,
                rights:1
            },
            where: {
                id:req.body.myid
            }
        })
        // const updatenbgood = await prisma.$queryRaw`update users set name = ${req.body.name}
        // where id = ${req.body.myid}`;
        res.status(201);//created
        res.json("Data submitted");
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in api/decks/users/edit.tsx"})       
    }finally{
        await prisma.$disconnect()

    }
}