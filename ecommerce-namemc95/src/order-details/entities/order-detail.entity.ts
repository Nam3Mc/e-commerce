import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "order_details"
})

export class OrderDetail {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    price: number

    // many to many required jointable and it can be declared jus by one side 
    // according with documentation example 
    @ManyToMany(() => Product )
    @JoinTable()
    product_: Product[]
}

// order-details has also a relation with orders but orders own the information
// becaus that it is not needed here according documentation.