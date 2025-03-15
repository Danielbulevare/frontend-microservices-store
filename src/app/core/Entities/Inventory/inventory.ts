import { UUID } from "crypto";
import { Action } from "../../Enums/action";

export interface Inventory {
    id: UUID,
    productId: UUID,
    userId: UUID,
    quantity: number,
    action: Action
    date: Date,
    orderNumber: UUID
}
