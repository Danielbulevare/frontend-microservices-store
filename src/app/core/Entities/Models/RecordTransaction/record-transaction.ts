import { UUID } from "crypto";

export interface RecordTransaction {
    productId: UUID,
    userId: UUID,
    quantity: number
}
