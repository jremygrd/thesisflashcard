import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    
    try{
        const answer = await prisma.answerofcard.create({
            data:{
                status : req.body.status,
                date : req.body.date,
                answerinputted: req.body.answerInputted,
                cards: {
                    connect : {id : req.body.fk_card}},
                users: {
                    connect : {id : req.body.fk_user}}
            }
        })

        if (req.body.status){
            const updatenbgood = await prisma.$queryRaw`update cards_users set nbgood = nbgood+1
            where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;

            const updatestreak = await prisma.$queryRaw`update cards_users set streak = streak+1
            where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;
        }else {

            const updatestreak = await prisma.$queryRaw`update cards_users set streak = 0
            where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;

            const updatenbbad = await prisma.$queryRaw`update cards_users set nbbad = nbbad+1
            where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;
    
        }

        const now = Date.now()
        const updatelasttry = await prisma.$queryRaw`update cards_users set lasttried = ${now}
        where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;

        res.status(201);//created
        res.json("Changes submitted");

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