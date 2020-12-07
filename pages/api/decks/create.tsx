import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});

    try{
        
        const stackData = req.body;

        const uuidstack = create_UUID();

        const stack = await prisma.stacks.create({
            data:{
                id:uuidstack,
                title: stackData.title,
                color:"none",
                emoji:"none",
                description:"none",

                users : {
                    connect :{
                        id : stackData.fk_user
                    }
                }
            }
        })

        const uuidcard = create_UUID();

        const blankCard= await prisma.$queryRaw(`insert into cards values ('${uuidcard}',
        'Exemple of question',
        'Hint',
        ARRAY [''],
        ARRAY [''],
        '${stackData.fk_user}')`);

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
                        id : stackData.fk_user
                    }
                }

            }
        })

        


        res.status(201);//created
        res.json({uuidstack});
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in api/decks/create.tsx"})       
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