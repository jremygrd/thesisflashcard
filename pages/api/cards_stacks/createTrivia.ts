import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    const deckById = await fetch (`https://opentdb.com/api.php?amount=1`);
    const deckData = await deckById.json();
    
    console.log(deckData.results[0].incorrect_answers);

            const uuid_card = create_UUID();
            const insertcard = prisma.$queryRaw(`INSERT INTO cards values(
                '${uuid_card}',
                '${deckData.results[0].question}',
                '',
                '[]',
                '["yes","no"]')`);


    try{
        // const uuid_deck = create_UUID();

        // const insertdeck = prisma.$queryRaw(`INSERT INTO stacks values(
        //     '${uuid_deck}',
        //     '${deckData.results[0].question}',
        //     'Color',
        //     'emoji',
        //     'A random trivia quiz',
        //     (SELECT id from users where name = 'jean'))`);

        // for(var i =0;i<deckData.results.length;i++){
        
        //     const uuid_card = create_UUID();
        //     console.log(deckData.results[i].incorrect_answers);
        //     const insertcard = prisma.$queryRaw(`INSERT INTO cards values(
        //         '${uuid_card}',
        //         '${deckData.results[i].question}',
        //         '',
        //         '[${deckData.results[i].incorrect_answers}]',
        //         '[${deckData.results[i].correct_answer}]')`);

        //     const insertcardsstacks = prisma.$queryRaw(`INSERT INTO cards_stacks values(
        //         DEFAULT,
        //         '${uuid_card}',
        //         '${uuid_deck}')`);
            
        //     const insertcardsstacksOver =prisma.$queryRaw('select * from cards')
        // }   
        res.status(201);//created
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in api/cards_stacks/createTrivia.ts"})       
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