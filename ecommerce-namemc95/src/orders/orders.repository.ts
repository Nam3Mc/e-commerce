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

    async orders(): Promise<Order []> {
        return this.ordersDB.find();
    }

    async getUserOrders(id: string): Promise<Order[]> {
        const user = await this.usersDB.getUserById(id);
        return user.orders_
    }

    async getOrderById(id: string): Promise<Order> {
        const order = await this.ordersDB.findOne({
            where: {id: id}, 
            relations: ["orderDetails_", "orderDetails_.product_"]
        })
        console.log(order)
        return order
    }

    async addOrder(newOrder: NewOrderDto):  Promise<Order> { 
        const {user_id, orderDetails_} = newOrder
        const user: Partial<User> = await this.usersDB.getUserById(user_id)
        const newDetails = new OrderDetail;
        newDetails.product_ = []
        newDetails.price = 0
        const order = new Order;
        order.user_ = user
        order.date = Date()
        order.orderDetails_ = newDetails
        for ( const id of orderDetails_ ) {
            const product: Product = await this.productsDB.getProductById(id.id)
            newDetails.product_.push(product)
            newDetails.price += product.price / 1 ;
            product.stock -= 1;
            this.productsDB.saveProduct(product);
        }
        await this.orderDetailsDB.addOrderDetails(newDetails);
        await this.ordersDB.save(order);
        const orderCreated = await this.getOrderById(order.id)
        return orderCreated
    }

    async deleteOrder( id: string ) {
        await this.ordersDB.delete({
            user_: {id}
        })
    }
}