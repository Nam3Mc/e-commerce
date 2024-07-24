import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "files"
})
export class File{ 

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    mimeType: string

    @Column({type: "bytea"})
    data: Buffer

    @ManyToOne( () => Order, (order) => order.files_)
    @JoinColumn()
    order_: Order
}