import fs from 'node:fs/promises'
import path from 'node:path'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'
import {getLiveGoldPrice} from './priceGenerator.js'

export async function serveStatic(req,res,baseDir) {
    console.log('The base directory is:', baseDir)
    const publicDir = path.join(baseDir,"public")
    const filePath = path.join(publicDir, req.url === "/" ? "index.html": req.url.slice(1))
    const extpath = path.extname(filePath)
    const contentType = getContentType(extpath)
    try {
      if (req.url === '/api/live-price') {
       res.statusCode = 200
       res.setHeader('Content-Type', 'text/event-stream')
       res.setHeader('Cache-Control', 'no-cache')
       res.setHeader('Connection', 'keep-alive')
       setInterval(()=> {
        const livePrice = getLiveGoldPrice()
        res.write(`data:${JSON.stringify({event: 'price-updates' , price: livePrice })}\n\n`) 
       },5000)
      } else {
        const content =  await fs.readFile(filePath)
        sendResponse(res,200,contentType,content)
      }
    }catch(err) {
        if (err.code === 'ENOENT') {
    const errFileName = "404.html"
    const errFilePath = path.join(publicDir,errFileName)
    const content = await fs.readFile(errFilePath);
      sendResponse(res,404,"text/html",content)
    } else {
      sendResponse(res ,500, "text/html", `<html><h1>Server Error: ${err.code}</h1></html>`)
    }
    }
}