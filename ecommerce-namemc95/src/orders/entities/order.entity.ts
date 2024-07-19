import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity({
    name: "orders"
})

export class Order {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();

    @OneToMany( () => User, (user => user.orders_))
    user_: User

    @Column()
    user_id: string

    @Column()
    date: string

    @OneToOne( () => OrderDetail)
    @JoinColumn()
    orderDetails_: OrderDetail 
}
