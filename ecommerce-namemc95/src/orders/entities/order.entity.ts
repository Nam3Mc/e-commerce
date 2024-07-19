import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity({
    name: "orders"
})

export class Order {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();

    @Column()
    date: string

    // many to one means an user may have many orders but order just one user
    // in this case the table with information will be the one owned many to one
    // here we just asigned the relationship and how it will be call in user's table
    @ManyToOne( () => User, (user) => user.orders_)
    user_: User

    // this was done following the docuentation, means it is correct do no change it
    // it is relate with orderdetails and order deteils wil not have a column with this information
    // this will be  just one direction
    @OneToOne( () => OrderDetail)
    @JoinColumn()
    orderDetails_: OrderDetail 
}
