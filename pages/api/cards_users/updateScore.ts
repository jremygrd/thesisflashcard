//Provide card ID

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});


    try{
        const now = Date.now()

        const toUpdate = await prisma.$queryRaw`select fk_card,lasttried,fk_user from cards_users 
        where fk_card in 
        (select fk_cardid from cards_stacks where fk_stackID = ${req.body.fk_deck}) 
        and fk_user =  ${req.body.fk_user};`;

        for(var i =0;i<toUpdate.length;i++){

            const diff = Math.abs(toUpdate[i].lasttried-now)
            var diffe = diff/(1000*60*60*24);
            diffe = Number((diffe).toFixed(2));

            const updatenbgood = await prisma.$queryRaw`update cards_users set diff = ${diffe}
            where fk_card = ${toUpdate[i].fk_card} and fk_user = ${toUpdate[i].fk_user}`;

            const result2 = await prisma.$queryRaw`update cards_users set score = 
            exp(-1 / (5 * streak/(nbGood+nbBad+1) + nbGood + 1))
            where fk_card = ${toUpdate[i].fk_card} and fk_user = ${toUpdate[i].fk_user}`;
        
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