import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({
    name: "users"
})

export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column({ type: "varchar", length: 50, nullable: false})
    name: string

    @Column({ type: "varchar", length: 50, unique: true, nullable: false })
    email: string

    @Column({ type: "varchar",  nullable: false })
    password:string

    @Column( "int" )
    phone: number

    @Column({ type: "varchar", length: 50 })
    country: string

    @Column ({ type: "text"})
    address: string

    @Column({ type: "varchar", length: 50 })
    city: string

    // like in the documentation we have the relation between 
    // users and orders wwhere user own an array of orders
    // here we either add any column or table aand the information will be addedd
    // in the table where the relation is many to one, this case orders
    @OneToMany( () => Order, (order) => order.user_)
    @JoinColumn()
    orders_: Order[]
    

}