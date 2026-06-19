import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.interface";

export const productController = (req: IncomingMessage, res: ServerResponse) => {

    const url = req.url;
    const method = req.method;

    const urlParts = url?.split("/");
    const id = urlParts && urlParts[2] !== null ? Number(urlParts[2]) : null;


    if (url === "/products" && method === "GET") {
        const productsItemList = readProduct();

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "This is product route!... it's a wonderfull journey!",
            data: productsItemList
        }))
    } else if (method === "GET" && id !== null) {
        const productsItemList = readProduct();

        const product = productsItemList.find((p: IProduct) => p.id === id)

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "the product is founded!",
            data: product
        }))
    }

}