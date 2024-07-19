import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { UserRepository } from "src/users/users.repository";
import { User } from "src/users/entities/user.entity";
import { ProductsRepository } from "src/products/products.repository";
import { NewOrderDto } from "./dto/newOrder.dto";
import { Product } from "src/products/entities/product.entity";
import { OrderDetailRepository } from "src/order-details/oredersDetails.repository";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";

@Injectable()
export class OrdersRepository {
    constructor( 
        @InjectRepository(Order)
        private ordersDB: Repository<Order>,
        private usersDB: UserRepository,
        private productsDB: ProductsRepository,
        private orderDetailsDB: OrderDetailRepository
    ) {}

    async getOrder(): Promise<Order[]> {
        return await this.ordersDB.find();
    }

    async addOrder(newOrder: NewOrderDto): Promise<any> {
        const {user_id, orderDetails_} = newOrder

        const user: User = await this.usersDB.getUserById(user_id)

        const order = new Order;
        order.user_id = user.id
        order.date = Date()
        await this.ordersDB.save(order)
// 
        order.user_id = user.id;
        order.date = Date()
// 
// 
        const createdOrder: Order = await this.ordersDB.save(order)
// 
        let total: number = 0;
        const products: Product [] = []
// 
        const ids = orderDetails_
        for (let i = 0; i < orderDetails_.length; i++) {
            const product: Product = await this.productsDB.getProductById(ids[i].id)
            product.stock -= 1
            products.push(product)
            total += product.price / 1 
            await this.productsDB.saveProduct(product)
        }
// 
        const orderDetails: Omit<OrderDetail, "id"> = {
            price: total,
            order_: createdOrder,
            product_: products
        } 
 
        await this.usersDB.saveOrder(user)
        await this.orderDetailsDB.addOrderDetails(orderDetails)
    }
}
