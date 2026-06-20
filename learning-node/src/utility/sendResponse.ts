import type { ServerResponse } from "node:http";



export const sendResponse = (
    res: ServerResponse, 
    statuseCode: number,
    success: boolean, 
    message: string, 
    data?: any
) => {

    const response = {
        success,
        message,
        data
    }

    res.writeHead(statuseCode, { "content-type": "application/json" });
    res.end(JSON.stringify(response))
}