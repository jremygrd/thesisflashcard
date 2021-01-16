import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    var nbOfCards = 0;
    for(var i =0;i<req.body.decks.length;i++){
        const cards = await prisma.$queryRaw`select id from cards where id in 
        (select fk_cardID from cards_stacks where fk_stackID = ${req.body.decks[i]})`
        nbOfCards += cards.length
    }

    console.log(req.body.fk_user,"ct b1 la")
    
    const examuuid = create_UUID()
    try{
        const exam = await prisma.exam.create({
            data:{
                id:examuuid,
                title:req.body.title,
                exam_date : req.body.date,
                users: {
                    connect : {id : req.body.fk_user}}
            }
        })

        for(var i =0;i<req.body.decks.length;i++){

        var deckId = req.body.decks[i];
        const exam_list = await prisma.exam_list.create({
            data:{
                exam: {
                    connect : {id : examuuid}},
                stacks:{
                    connect:{id:deckId}
                }
            }
        })

    }

        res.status(201);//created
        res.json({success:"success of answer upload"});

    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in api/decks/users.tsx"})       
    }finally{
        await prisma.$disconnect()

    }
    
}
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
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

