import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "order-details"
})

export class OrderDetail {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();

    @Column( 
        "decimal", 
        { 
            precision: 10, 
            scale: 2,
            nullable: true
        }
    )
    price: number

    @OneToOne( () => Order)
    @JoinColumn()
    order_: Order

    @ManyToMany( () => Product)
    @JoinTable()
    product_: Product[]
}
