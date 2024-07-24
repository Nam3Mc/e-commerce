import { Injectable } from "@nestjs/common";
import { Order } from "src/orders/entities/order.entity";

@Injectable()
export class FileDto {
    name: string
    mimeType: string
    data: Buffer
    order_: Order
}