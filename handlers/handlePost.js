import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import { getLiveGoldPrice } from '../utils/priceGenerator.js'
import { parseJSBody } from '../utils/parseJSBody.js'
import { sendResponse } from '../utils/sendResponse.js'
import path from 'node:path'
export async function handlePost(req,res){
    try {
        const currentGoldPrice = getLiveGoldPrice()
        const dataBody = await parseJSBody(req)
        const summaryObject  = {
            currentGoldPrice: currentGoldPrice,
            ounces : parseFloat(dataBody.amount) / currentGoldPrice,
             buyerId : crypto.randomUUID()
        }
        const logEntry  = `Buyers ID: ${summaryObject.buyerId} just bought ${summaryObject.ounces} ounces (ozt) of gold at $${summaryObject.currentGoldPrice} per oz, with a total investment of $${parseFloat(dataBody.amount)}. You will receive documentation shortly`
        const pathLog = path.join('data','investments.log')
        await fs.appendFile(pathLog, logEntry + '\n', 'utf8')
        console.log(dataBody)

        sendResponse(res,201,'application/json',JSON.stringify(summaryObject ))

    }catch (err){
        throw new Error(`Invalid JSON format: ${err}`)
    }
}