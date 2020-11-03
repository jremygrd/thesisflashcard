import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    try{
        const {stack:stackData} = req.body;
        const stack = await prisma.stacks.create({
            data:{
                //id: stackData.id,
                title: stackData.title,
                color:stackData.color,
                emoji:stackData.emoji,
                description:stackData.description,

                users : {
                    connect :{
                        id : stackData.fk_user
                    }
                }
            }
        })


        res.status(201);//created
        res.json("Data submitted");
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in api/decks/create.tsx"})       
    }finally{
        await prisma.$disconnect()

    }

    
}

/*
How to Send ?

Post Request :

{"stack":{
	"title":"nicetitle",
	"color":"orange",
	"emoji":"happy",
	"description":"nice quiz",
	 "fk_user" : "b4785ff4-0bfc-4382-bfbf-b948e0b452de"	
	}
}


*/