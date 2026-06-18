import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service";

export const productController = (req: IncomingMessage, res: ServerResponse) => {

    // const productsItemList = [
    //     {
    //         id: 423,
    //         name: "Energy Plus Biscuit",
    //         price: 55,
    //         size: "medium"
    //     },
    //     {
    //         id: 234,
    //         name: "Gold meri Biscuit",
    //         price: 70,
    //         size: "medium"
    //     },
    //     {
    //         id: 709,
    //         name: "Nutty Biscuit",
    //         price: 15,
    //         size: "small"
    //     }
    // ]

    const productsItemList = readProduct();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({
        message: "This is product route!... it's a wonderfull journey!",
        data: productsItemList
    }))
}