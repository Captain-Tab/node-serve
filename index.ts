import * as http from 'http'
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from 'path'
import * as url from 'url'
const { parse: parseQuery } = require('querystring');

const server = http.createServer()
const publicDir = path.resolve(__dirname, 'public')
const serverOrigin = 'http://localhost:9999';


server.on('request', (request: IncomingMessage, response: ServerResponse)=> {
    const { method, url: urlPath, headers} = request
    const url = new URL(request.url, serverOrigin);
    const {pathname} = url
    // Parse the URL query. The leading '?' has to be removed before this.
    const query = parseQuery(url.search.substr(1));
    console.log('url',pathname)
    switch (pathname) {
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
        default:
            response.statusCode = 404
            response.end()
    }
})

server.listen('9999')
