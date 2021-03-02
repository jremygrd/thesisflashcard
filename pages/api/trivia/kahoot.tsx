import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {element} from "prop-types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});

    try {
        const stackData = req.body.key;

        const uuidstack = create_UUID();

        console.log(stackData, "tet")
        const stack = await prisma.stacks.create({
            data: {
                id: uuidstack,
                title: stackData[0].title,
                color: "none",
                emoji: "none",
                description: "none",

                users: {
                    connect: {
                        id: "1w7K30BqJFTR6rJLKdAP9aasoKM2"
                    }
                }
            }
        })


        for (var i = 1; i < stackData.length; i++) {

            console.log(i);
            console.log(stackData[i], "cc");
            var question = stackData[i].question;
            var answer = stackData[i].answer;
            var bad_options = stackData[i].bad_options;

            var ans = '[';

            for(var j =0;j<answer.length;j++){
            ans = ans+"'"+doubleQuotes(answer[j])+"'";
            if (j != answer.length-1){ans+=","}
            }
            ans+=']'

            var bad = '[';

            for(var j =0;j<bad_options.length;j++){
            bad = bad+"'"+doubleQuotes(bad_options[j])+"'";
            if (j != bad_options.length-1){bad+=","}
            }
            bad+=']'
            const uuid = create_UUID();
            var c = "";


            c+=`insert into cards values ('${uuid}',
            '${doubleQuotes(stackData[i].question)}',
            '',
            ARRAY ${bad},
            ARRAY ${ans},
            '1w7K30BqJFTR6rJLKdAP9aasoKM2')`;

                const stack= await prisma.$queryRaw(c);

                const cards_stacks = await prisma.cards_stacks.create({
                    data: {

                        cards: {
                            connect: {
                                id: uuid
                            }
                        },
                        stacks: {
                            connect: {
                                id: uuidstack
                            }
                        }

                    }
                })
                const cards_users = await prisma.cards_users.create({
                    data: {
                        nbgood: 0,
                        nbbad: 0,
                        streak: 0,
                        diff: 1,
                        lasttried: 1605137172227,
                        score: 0.5,
                        score_ct: 0.5,
                        cards: {
                            connect: {
                                id: uuid
                            }
                        },
                        users: {
                            connect: {
                                id: "1w7K30BqJFTR6rJLKdAP9aasoKM2"
                            }
                        }
                    }
                })
        }
        res.status(201)
        res.json({error:"An youuupiiiiiiiiiiii occured in api/decks/kahoot.tsx"})

    }
    catch(e) {
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in api/decks/kahoot.tsx"})
    }
    finally {
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

function doubleQuotes(str : string){
        str = str.replace(/'/g,"''")
        return str;
    }
