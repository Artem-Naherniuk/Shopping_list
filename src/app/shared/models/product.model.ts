import { IProduct } from "../interfaces/product.interface";

export class Product implements IProduct {
    constructor(
        public product_name: string,
        public product_price: number,
        public product_count: number,
        public id?: number
    ) { }
}