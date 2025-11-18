import http from "node:http"
import {serveStatic} from "./utils/serveStatics.js"
const PORT = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async (req,res) => {
    await serveStatic(req,res,__dirname)
})

server.listen(PORT, () => {
     console.log(`Server is running at http://localhost:${PORT}`)
})