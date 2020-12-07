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
        const diff = await prisma.$queryRaw`select diff from cards_users
        where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;
        
        if (diff[0].diff > 1)   //Eviter de comptabiliser en score long terme si réponse moins de 24h après
        {

        
            if (req.body.status){
                const updatenbgood = await prisma.$queryRaw`update cards_users set nbgood = nbgood+1
                where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;

                const updatestreak = await prisma.$queryRaw`update cards_users set streak = streak+1
                where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;

                const updatestreakct = await prisma.$queryRaw`update cards_users set streakct = streakct+1
                where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;
            }else {

                const updatestreak = await prisma.$queryRaw`update cards_users set streak = 0
                where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;

                const updatenbbad = await prisma.$queryRaw`update cards_users set nbbad = nbbad+1
                where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;
        
            }
        }else{

            if (req.body.status){
                const updatenbgood = await prisma.$queryRaw`update cards_users set nbgoodct = nbgoodct+1
                where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;

                const updatestreak = await prisma.$queryRaw`update cards_users set streakct = streakct+1
                where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;
            }else {

                const updatestreak = await prisma.$queryRaw`update cards_users set streakct = 0
                where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;

                const updatenbbad = await prisma.$queryRaw`update cards_users set nbbadct = nbbadct+1
                where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;
        
            }
        }

        const now = Date.now()
        const updatelasttry = await prisma.$queryRaw`update cards_users set lasttried = ${now}
        where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;

        //On update le score court terme qui ne changera qu'à la prochaine réponse de cette carte, et pas avec le temps
        const updateScorect = await prisma.$queryRaw`update cards_users set score_ct = 
        0.5 * (nbGood + nbGoodct) + (streak+streakct) * 0.125 + 0.25 * ( 1 - exp(-0.05 * (nbGood + nbGoodct + nbBad + nbBadct)))
        where fk_card = ${req.body.fk_card} and fk_user = ${req.body.fk_user}`;


        res.status(201);//created
        res.json({success:"success of answer upload"});

    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in api/answer_cards/create"})       
    }finally{
        await prisma.$disconnect()

    }
    
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