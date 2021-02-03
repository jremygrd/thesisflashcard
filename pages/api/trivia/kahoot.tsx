import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({ log: ["query"] });

    try {
        const allData = req.body;

        const uuidstack = create_UUID();

        const stack = await prisma.stacks.create({
            data:{
                id:uuidstack,
                title: allData[0].titre,
                color:"none",
                emoji:"none",
                description:"none",
                categorie:"none",

                users : {
                    connect :{
                        id : "1w7K30BqJFTR6rJLKdAP9aasoKM2"
                    }
                }
            }
        })

        

    }
    catch {

    }
    finally{

    }
}