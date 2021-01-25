import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});


    try{        
        const uuidstack = create_UUID();
        console.log('dedfrfede')
        const stack = await prisma.stacks.create({
            data:{
                id:uuidstack,
                title: "Copie de "+req.body.deck.title,
                color:"none",
                emoji:"none",
                description:req.body.deck.description,
                categorie:req.body.deck.categorie,
                imageurl:req.body.deck.imageUrl,

                users : {
                    connect :{
                        id : req.body.fk_user
                    }
                }
            }
        })

        const stack_list = await prisma.stack_list.create({
            data:{
                users : {
                    connect :{
                        id : req.body.fk_user
                    }
                },
                stacks:{
                    connect:{
                        id: uuidstack
                    }
                }
            }
        })

        

        const allCardsToDuplicate = await prisma.$queryRaw`SELECT * FROM cards WHERE cards.id in (SELECT fk_cardid FROM cards_stacks WHERE fk_stackid = ${req.body.deck.id});`

        console.log("All cards to duplicate",allCardsToDuplicate);

        for(var i =0;i<allCardsToDuplicate.length;i++)
        {
            const uuidcard = create_UUID();

            var ans = '[';

            for(var j =0;j<allCardsToDuplicate[i].answer.length;j++){
            ans = ans+"'"+(allCardsToDuplicate[i].answer[j])+"'";
            if (j != allCardsToDuplicate[i].answer.length-1){ans+=","}
            }
            ans+=']'
            
            
            var bad = '[]';
            if(allCardsToDuplicate[i].bad_options.length!=0){
                 bad = '[';
                for(var j =0;j<allCardsToDuplicate[i].bad_options.length;j++){
                bad = bad+"'"+(allCardsToDuplicate[i].bad_options[j])+"'";
                if (j != allCardsToDuplicate[i].bad_options.length-1){bad+=","}
                }
                bad+=']'
            }
            
            var c = ""

            c+=`insert into cards values ('${uuidcard}',
            '${(allCardsToDuplicate[i].question)}',
            '${(allCardsToDuplicate[i].tip)}',
            ARRAY ${bad}::text[],
            ARRAY ${ans}::text[],
            '${req.body.fk_user}')`;

            const stack= await prisma.$queryRaw(c);
        
            const cards_stacks = await prisma.cards_stacks.create({
                data:{
                   
                    cards : {
                        connect :{
                            id : uuidcard
                        }
                    },
                    stacks :{
                        connect :{
                            id : uuidstack
                        }
                    }
                }
            })


            const cards_users = await prisma.cards_users.create({
                data:{
                   nbgood:0,
                   nbbad:0,
                   streak:0,
                   nbgoodct:0,
                   nbbadct:0,
                   streakct:0,
                   diff:1,
                   lasttried:new Date().getTime(),
                   score:0.5,
                    cards : {
                        connect :{
                            id : uuidcard
                        }
                    },
                    users :{
                        connect :{
                            id : req.body.fk_user
                        }
                    }
    
                }
            })

           


        }

        const keywords = await prisma.$queryRaw`SELECT keyword FROM keywords_stacks WHERE fk_stackID = ${req.body.deck.id};`

        for(var i =0;i<keywords.length;i++)
        {
        const createkeyword = await prisma.$queryRaw `insert into keywords_stacks values (DEFAULT,${keywords[i].keyword}, ${uuidstack});`
        }



       
        res.status(201);//created
        res.json(stack);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured"})       
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