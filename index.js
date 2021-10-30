const yargs=require('yargs')
const fs=require('fs')

data=fs.readFileSync('storage.json');

parsedData=JSON.parse(data)


yargs.version('1.0.0')

yargs.command(
    {
        command:'add',
        describe:'Add new note',
        builder: {
            title:{
                describe:'title name',
                type:'string',
                demandOption:true,
            },
            body:{
                describe:'body name',
                type:'string',
                demandOption:true,
            }
        },
        handler:(argv)=>{
            book={
                id:parsedData.length+1,
                title:argv.title,
                body:argv.body
            }

            parsedData.push(book);


            fs.writeFileSync('storage.json',JSON.stringify(parsedData))
        }
    }
)

yargs.command(
    {
        command:'remove',
        describe:'remove item from the list',
        builder:{
            id:{
                type:'number',
                demandOption:true,
                describe:'id of an item you want to delete'
            }
        },
        handler:(argv)=>{

            parsedData=parsedData.filter((item)=>item.id!=argv.id);
            fs.writeFileSync('storage.json',JSON.stringify(parsedData))
            
        }
    }
)

yargs.command(
    {
        command:'all',
        describe:'display all items',
        handler:(argv)=>{

            parsedData.map((item)=>{
                const count=1;

                console.log('\nitem '+item.id)
                console.log('------------------------------------------------------------')
                console.log('title:'+item.title)
                console.log('body:'+item.body)
                console.log('____________________________________________________________\n\n')

            })
            
        }
    }
)

console.log(yargs.argv)