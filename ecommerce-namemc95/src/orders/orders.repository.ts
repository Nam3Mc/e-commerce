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

    async getOrderById(id: string): Promise<Order> {
        console.log(id)
        const order = await this.ordersDB.findOne({
            where: {id: id}, 
            relations: ["orderDetails_"]
        })
        console.log(order)
        return order
    }

    async addOrder(newOrder: NewOrderDto): Promise<Omit< OrderDetail, "product_">> {

        // we received user id and an array with produts id
        // we sparate then using destructuring 
        const {user_id, orderDetails_} = newOrder

        // with user_id we can find an user 
        // there is the posibility to add a verification if 
        const user: User = await this.usersDB.getUserById(user_id)

        // creating an ew detais Order we are able to add price 
        // and items to the order before saving it with for loop
        const newDetails = new OrderDetail;
        newDetails.product_ = []
        newDetails.price = 0

        // if user is verified we create the order and add the user data
        // and date or other field can be modified
        const order = new Order;
        order.user_ = user
        order.date = Date()
        order.orderDetails_ = newDetails

        // for loop iterate over orderdetails_ and get each item add 
        // them to the details order list calculate the total and 
        // reduce the stock quantity of products saving changes in productsDB
        for ( const id of orderDetails_ ) {
            const product: Product = await this.productsDB.getProductById(id.id)
            newDetails.product_.push(product)
            newDetails.price += product.price / 1 ;
            product.stock -= 1;
            this.productsDB.saveProduct(product);
        }

        // first to have the rigth process first we need to save orderDetails
        // then save the order and it create both correctly
        await this.orderDetailsDB.addOrderDetails(newDetails);
        await this.ordersDB.save(order);

        return newDetails
    }
}