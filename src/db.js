import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url'
const DB_PATH = fileURLToPath(new URL('../db.json', import.meta.url))

//function to get Database
export const getDB = async () =>{
    const db = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(db)
}


//function to save DataBase
export const saveDB = async (db) =>{
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
    return db
}

//function to insert in database
export const insertDB = async (data) =>{
    const db = await getDB()
    db.notes.push(data)
    await saveDB(db)
    return data
}

