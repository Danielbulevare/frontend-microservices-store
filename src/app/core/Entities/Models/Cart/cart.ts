import { Product } from "../../Products/product";

export interface Cart {
    product: Product,
    quantity: number,
    total: number
}
