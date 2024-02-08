import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {newNote, getAllNotes, findNotes, removeNote, removeAllNotes} from './notes.js'
import {start} from './server.js'

const listNotes = (notes, type='') =>{
    if(notes.length > 0 || (notes.length > 0 && type === 'find'))
        notes.forEach(({id, content, tags}, index) =>{
            console.log("Index", index )
            console.log('Note Id:', id)
            console.log("Note Tags:", tags)
            console.log("Note Content:", content)
            console.log("\n")
        })
    else {
        if(type === 'all'){
            console.log("No Data Found")
        } else {
            console.log("No Match Found")
        }
        
    }
}

yargs(hideBin(process.argv))

    // command to create new note --> note new ["data"] ---tags ["data1, data2"]
    .command('new <note>', 'Create a new note', yargs =>{
        return yargs.positional('note',{
            type:'string',
            description: 'The content of the note to create'
        })
    }, async (argv) =>{
        const tags  = argv.tags ? argv?.tags.split(',') : []
        const note = await newNote(argv.note, tags)
        console.log("Note Added!", note?.id)
        console.log("Note Added!", note)
    })
    .option('tags', {
        alias:'t',
        type:'string',
        description:'tags to add to the note'
    })


    //Command to get all note --> note all
    .command('all', 'get all notes', () => {}, async (argv) =>{
        const notes = await getAllNotes()
        listNotes(notes, 'all')
    })


    //command to get filtered notes --> note find ["key"]
    .command('find <filter>', 'get matching notes', yargs =>{
        return yargs.positional('filter', {
            description :'The Search term of filter notes by, will be applied on content',
            type:'string'
        })
    }, async (argv) =>{
        const filteredNotes = await findNotes(argv.filter)
        listNotes(filteredNotes, 'find')
    })
    

    // Command to remove notes --> note remove [id]
    .command('remove <id>', 'remove a note by id', yargs =>{
        return yargs.positional('id', {
            type:'number',
            description:'The id of note you want to remove'
        })
    }, async (argv) =>{
        const removedNote = await removeNote(argv.id)
        console.log(removedNote)
    })


    //Command to get the web port
    .command('web [port]', 'launch website to see notes', yargs =>{
        return yargs.positional('port', {
            describe :'port to bind on',
            default: 5000,
            type:'number'
        })
    }, async (argv) =>{
        const notes = await getAllNotes()
        start(notes, argv.port)        
    })


    // Command to clear all notes
    .command('clean', 'remove all notes', () =>{}, async (argv) =>{
        await removeAllNotes()
        console.log("DB Reseted")
    })
    .demandCommand(1)
    .parse()

