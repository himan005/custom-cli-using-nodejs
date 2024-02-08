import fs from 'node:fs';
import http from 'node:http';
import open from 'open'
import {fileURLToPath} from 'node:url'

export const interpolate = (html, data)=>{
    return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) =>{
        return data[placeholder] || ''
    });
}

 export const formatNotes = (notes) =>{
    return notes.map( note =>{
        return `
            <div class='note'>
                <p>${note.content}<p>
                <div class="tags">
                    ${note.tags.map(tag => `<span class="tags">{tag}</span>`).join('')}
                </div>
            <div>
        `
    }).join('\n')
}
export const createServer = (notes) =>{
    return  http.createServer(async (req, res) =>{
        const HTML_PATH = fileURLToPath(new URL('./template.html', import.meta.url))
        const template = await fs.readFile(HTML_PATH, 'utf-8')
        const html = interpolate(template, {notes:formatNotes(notes)})
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(html)
    })
}

export const start = (notes,port) =>{
    const server = createServer(notes)
    server.listen(port, () =>{
        console.log(`Server is listing on port ${port}`)
    })
    open(`http://localhost:${port}`)
}

