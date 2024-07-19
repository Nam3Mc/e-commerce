import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuid } from "uuid";

@Entity({
    name: "users"
})

export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();
    
    @Column({length: 50, nullable: true})
    name: string

    @Column({ length: 50, unique: true, nullable: true })
    email: string

    @Column({ length: 20, nullable: true })
    password:string

    @Column( "int" )
    phone: number

    @Column({ length: 50 })
    country: string

    @Column()
    address: string

    @Column({ length: 50 })
    city: string

    // like in the documentation we have the relation between 
    // users and orders wwhere user own an array of orders
    // here we either add any column or table aand the information will be addedd
    // in the table where the relation is many to one, this case orders
    @OneToMany( () => Order, (order) => order.user_)
    orders_: Order[]

}