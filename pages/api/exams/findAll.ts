import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";



export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    let id = req.body.id
    try{
        const exams = await prisma.exam.findMany({
            where:{
                fk_userid:id
            }


        })

        res.json(exams);
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in api/decks/findAll.tsx"})       
    }finally{
        await prisma.$disconnect()

    }

}