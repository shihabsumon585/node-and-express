import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import { routeHandler } from "./route/route";


const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.url);
    // console.log(req.method);

    routeHandler(req, res);
})

server.listen(5000, () => {
    console.log("Server is running on the port 5000")
})