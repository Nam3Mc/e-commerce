import { Category } from "src/categories/entities/category.entity";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "products"
})
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid(); 

    @Column(
        {
            length: 50,
            nullable: true
        }
    )
    name: string
    
    @Column(
        {
            nullable:true
        }
    )
    description: string

    @Column(
        "decimal", 
        { 
            precision: 10, 
            scale: 2,
            nullable: true
        }
    )
    price: number

    @Column(
        {
            nullable: true
        }
    )
    stock: number

    @Column({
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjTeYUVmOczg3JN3PsE7QVwrdF_EwnbL0gAA&s"
    })
    imgUrl: string

    @OneToMany( () => Category, (category => category.product_ ))
    @JoinColumn({ name: "category_id"})
    category_: Category[]

    @Column()
    category_id: string

    @ManyToMany( () => OrderDetail)
    orderDetail_: OrderDetail[]
}