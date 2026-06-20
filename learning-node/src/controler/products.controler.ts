import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.interface";
import { parseBody } from "../utility/parseBody";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {

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
    } else if (method === "POST" && url === "/products") {

        const productsItemList = readProduct();
        const body = await parseBody(req);

        const newProduct = {
            id: Date.now(),
            ...body
        }

        productsItemList.push(newProduct);
        insertProduct(productsItemList);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "The product is created!",
            data: newProduct
        }))
    } else if (method === "PUT" && id !== null) {
        const body = await parseBody(req);

        const productsItemList = readProduct();
        const index = productsItemList.findIndex((p: IProduct) => p.id === id);
        // console.log(index);
        if (index < 0) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({
                message: "This product not found...",
                data: null
            }))
        }

        console.log(productsItemList[index].id)
                
        productsItemList[index] = { id: productsItemList[index].id, ...body }

        insertProduct(productsItemList);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "The product is update succefull...",
            data: productsItemList[index]
        }))



    }

}