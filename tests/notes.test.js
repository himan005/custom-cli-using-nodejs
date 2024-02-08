// Example fo testing of add function
//  const add = (num, num2) => num + num2

//  test('add takes two numbers and return a sum', () =>{
//     const result = add(1,2)
//     expect(result).toBe(3)
//  })

//test fop real 
import {jest} from '@jest/globals';

jest.unstable_mockModule('../src/db.js', ()=>({
   insertDB: jest.fn(),
   getDB: jest.fn(),
   saveDB: jest.fn() 
}));

const {insertDB, getDB,saveDB} = await import ('../src/db.js');
const {newNote, getAllNotes, removeNote}= await import ('../src/notes.js')

 beforeEach(() =>{
   insertDB.mockClear();
   getDB.mockClear()
   saveDB.mockClear()
})

describe('Cli App', ()=>{
   //test for creating note
   test('newNote insert data and return it', async () =>{
      const note ={
         content: "This is my note",
         tags:['tag1', 'tag2']
      }
      const data = {
         tags: note?.tags,
         content:note?.content,
         id: Date.now()
      }
      insertDB.mockResolvedValue(data);
      const result = await newNote(note.content, note.tags)
      expect(result).toEqual(data)
   });

   //test for get all notes
   test('get All Notes', async () =>{
      const db = {
         notes:['note1', 'note2', 'note3']
      }
      getDB.mockResolvedValue(db)
      const result = await getAllNotes();
      expect(result).toEqual(db.notes)
   });

   //test for remove note from database
   test('remove note if note not found do nothing', async () =>{
      const notes = [
      { id: 1, content: 'note 1' },
      { id: 2, content: 'note 2' },
      { id: 3, content: 'note 3' },
      ];
      saveDB.mockResolvedValue(notes)
      const idToRemove = 4;
      const result = await removeNote(idToRemove)
      expect(result).toBeUndefined()
   });
})






 

