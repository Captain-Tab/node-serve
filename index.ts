import * as http from 'http'
import {IncomingMessage, ServerResponse} from "http";

const server = http.createServer()

server.on('request', (request: IncomingMessage, response: ServerResponse)=> {
    console.log(request.method, request)
    const array = []
    request.on('data', (chunk)=> {
        array.push(chunk)
        request.on('end', ()=> {
            const body = Buffer.concat(array).toString()
            console.log(body);
        })
    })

})

server.listen('8888')
