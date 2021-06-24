import * as http from 'http'
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from 'path'
import * as url from 'url'
const { parse: parseQuery } = require('querystring');

const server = http.createServer()
const publicDir = path.resolve(__dirname, 'public')
const serverOrigin = 'http://localhost:9999'
let cacheAge = 3600 * 24 * 365

server.on('request', (request: IncomingMessage, response: ServerResponse)=> {
    const { method, url: urlPath, headers} = request

    if (method === 'POST') {
        response.statusCode = 405
        response.end()
        return
    }

    const url = new URL(request.url, serverOrigin);
    const {pathname} = url
    // Parse the URL query. The leading '?' has to be removed before this.
    const newSearchParams = new URLSearchParams(url.searchParams);
    console.log('pathname', pathname)
    let fileName = pathname.substring(1)
    // response.setHeader('Content-Type', 'text/html; charset=utf-8')
    if (fileName === '') {
        fileName = 'index.html'
    }
    fs.readFile(path.resolve(publicDir, fileName), (error, data)=> {
        if (error) {
            console.log(error)
            if (error.errno === -2) {
                response.statusCode = 404
                fs.readFile(path.resolve(publicDir, '404.html'), (error, data)=> {
                    response.end(data)
                })
                response.end('the file is not found')
            } else  {
                response.statusCode = 500
                response.end('server was occupied, please try it later')
            }
        } else  {
            response.setHeader('Cache-Control', `public, max-age=${cacheAge}`)
            response.end(data)
        }
    })
})

server.listen('9999')
