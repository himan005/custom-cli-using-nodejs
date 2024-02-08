import http from 'node:http';
const server = http.createServer((req, res) =>{
    res.statusCode=200
    res.setHeader('Content-type', 'text/plain')
    res.end("Hello world")
})

server.listen(3000, ()=>{
    console.log("Server running at 3000")
})