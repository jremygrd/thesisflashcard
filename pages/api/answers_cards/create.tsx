import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    
    try{
        console.log(req.body.answerinputted)
        const answer = await prisma.answerofcard.create({
            data:{
                status : req.body.status,
                date : req.body.date,
                answerinputted: req.body.answerinputted,
                cards: req.body.cards,
                users: req.body.users
            }
        })

        console.log("did we do it ???")
        res.status(201);//created
        res.json(answer);
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in api/decks/users.tsx"})       
    }finally{
        await prisma.$disconnect()

    }
    
    res.json({decks:"Done"});
    
}

/*
How to Send ex for Decks?

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