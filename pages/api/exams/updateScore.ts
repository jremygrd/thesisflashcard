//Provide card ID

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});


    try{

        if(req.body.isLongTerme)
        {

       
            const now = Date.now()
            const toUpdate = await prisma.$queryRaw`select cards.id,lasttried from cards
                join cards_users cu on cards.id = cu.fk_card
            where id in (select fk_cardID from cards_stacks where fk_stackID in
                    (select fk_stackID from exam_list where exam_list.fk_examId = ${req.body.fk_deck}))
            and cu.fk_user = ${req.body.fk_user}
            order by cu.score,cu.score_ct ;`   


            for(var i =0;i<toUpdate.length;i++){

                const diff = Math.abs(toUpdate[i].lasttried-now)
                var diffe = diff/(1000*60*60*24);
                diffe = Number((diffe).toFixed(2));

                const updateTimeDiff = await prisma.$queryRaw`update cards_users set diff = ${diffe}
                where fk_card = ${toUpdate[i].id} and fk_user = ${req.body.fk_user}`;

                const updateScore = await prisma.$queryRaw`update cards_users set score = 
                exp(- diff / (5 * streak/(nbGood+nbBad+1) + nbGood + 1))
                where fk_card = ${toUpdate[i].id} and fk_user = ${req.body.fk_user}`;


        
            }   
        }
        res.status(201);//created
        res.json("Scores of this deck calculated");
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured"})       
    }finally{
        await prisma.$disconnect()

    }
    
}

function dateToString(date:any) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dateOfString = (("" + day).length < 2 ? "0" : "") + day + "/";
    dateOfString += (("" + month).length < 2 ? "0" : "") + month + "/";
    dateOfString += date.getFullYear();
    return dateOfString;
}