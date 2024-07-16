import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "products"
})
export class Product {

    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    name: string
    
    @Column()
    description: string

    @Column()
    price: number

    @Column()
    stock: boolean

    @Column()
    imgUrl: string

    @Column()
    createdAt: string
}