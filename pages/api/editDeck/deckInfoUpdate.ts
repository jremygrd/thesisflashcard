//Provide deck ID

import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log:["query"]});
    //const {deck:deckData} = req.body;
    let c='';
    c+=`update stacks set 
    title = '${doubleQuotes(req.body.title)}',
    description = '${doubleQuotes(req.body.description)}',
    imageurl = '${req.body.imageurl}',
    private = ${req.body.private}
    where id = '${req.body.id}'`;



    try{
        const quest = await prisma.$queryRaw(c);

        let d = '';
        d+=`delete from keywords_stacks where fk_stackID = '${req.body.id}'`

        const del = await prisma.$queryRaw(d);

        for(var i = 0;i<req.body.tags.length;i++){
            let p = ''
            p+=`insert into keywords_stacks values(default,('${req.body.tags[i]}'), '${req.body.id}')`
            const push = await prisma.$queryRaw(p);
        }

        res.status(201);//created
        res.json(req.body);
 
    }catch (e){
        console.log(e);
        res.status(500);
        res.json({error:"An error occured in submitChanges"})       
    }finally{
        await prisma.$disconnect()

    }
    

    function doubleQuotes(str : string){
        str = str.replace(/'/g,"''")
        return str;
    }
}