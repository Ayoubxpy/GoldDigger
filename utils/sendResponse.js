export function sendResponse(res,statuscode,contentType,content) {
    res.statusCode = statuscode
    res.setHeader("Content-Type" , contentType)
    res.end(content)
}