import * as http from 'http'
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from 'path'

const server = http.createServer()
const publicDir = path.resolve(__dirname, 'public')

server.on('request', (request: IncomingMessage, response: ServerResponse)=> {
    const { method, url, headers} = request
    switch (url) {
        case '/index.html':
            fs.readFile(path.resolve(publicDir, 'index.html'), (error, data)=> {
                if (error) throw error
                response.end(data.toString())
            })
            break;
        case '/style.css':
            response.setHeader('Content-Type', 'text/css; charset=utf-8')
            fs.readFile(path.resolve(publicDir, 'style.css'), (error, data)=> {
                if (error) throw error
                response.end(data.toString())
            })
            break;
        case '/main.js':
            response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
            fs.readFile(path.resolve(publicDir, 'main.js'), (error, data)=> {
                if (error) throw error
                response.end(data.toString())
            })
            break;
    }
})

server.listen('9999')
