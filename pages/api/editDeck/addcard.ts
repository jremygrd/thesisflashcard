//Provide deck ID

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    //const {deck:deckData} = req.body;

    //Problème, postresql fais une différence entre les single et double quotes, là ou les double quotes sont 
    //détruites en passant en requête :(((
    //On doit reconstruire nos arrays

    console.log("BODYY",req.body);

    var ans = '[';

    for(var i =0;i<req.body.question.answer.length;i++){
    ans = ans+'"'+req.body.question.answer[i]+'"';
    if (i != req.body.question.answer.length-1){ans+=","}
    };
    ans+=']';
    
    var bad = '[';

    for(var i =0;i<req.body.question.bad_options.length;i++){
    bad = bad+'"'+req.body.question.bad_options[i]+'"';
    if (i != req.body.question.bad_options.length-1){bad+=","}
    };
    bad+=']';

    try{
        const uuid = create_UUID();

        const stack = await prisma.cards.create({
            data:{
                id: uuid,
                question:req.body.question.question,
                tip:req.body.question.tip,
                answer:ans,
                bad_options:bad,
                users : {
                    connect :{
                        id : '624d86f8-834d-4e3f-8488-c22dfdbaa15b'
                    }
                }

            }
        })

        const cards_stacks = await prisma.cards_stacks.create({
            data:{
               
                cards : {
                    connect :{
                        id : uuid
                    }
                },
                stacks :{
                    connect :{
                        id : req.body.deck.id
                    }
                }

            }
        })
        console.log("ca se corse2",req.body.user);
        const cards_users = await prisma.cards_users.create({
            data:{
               
                cards : {
                    connect :{
                        id : uuid
                    }
                },
                users :{
                    connect :{
                        id : req.body.user
                    }
                }

            }
        })




       
        // const addCard = await prisma.$queryRaw(`INSERT INTO cards values( 
        // id = '${uuid}',
        // question = '${req.body.question.question}',
        // tip = '${req.body.question.tip}',
        // answer = '${ans}',
        // bad_options = '${bad}',
        // fk_user = '${req.body.question.user}'
        // );`);

        // const addCards_stacks = await prisma.$queryRaw(`INSERT INTO cards_stacks values( 
        //     id = '${uuid}',
        //     fk_cardid = '${req.body.question.id}',
        //     fk_stackid = '${req.body.deck.id}'
        //     )`);

        res.status(201);//created
        res.json(stack);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in submitChanges"})       
    }finally{
        await prisma.$disconnect()

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
    
}