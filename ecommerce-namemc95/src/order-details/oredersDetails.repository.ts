import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "./entities/order-detail.entity";
import { Repository } from "typeorm";


@Injectable()
export class OrderDetailRepository {

    constructor(
        @InjectRepository(OrderDetail)
        private orderDetailsDB: Repository<OrderDetail>
    ) {}

    async orderDetails(id: string): Promise<OrderDetail[]> {
        return await this.orderDetailsDB.find({
            where: {id},
            relations: ["product_"]
        });
    }

    async addOrderDetails(orderDetails: Omit<OrderDetail, "id">): Promise<OrderDetail> {
        return await this.orderDetailsDB.save(orderDetails)
    }
}