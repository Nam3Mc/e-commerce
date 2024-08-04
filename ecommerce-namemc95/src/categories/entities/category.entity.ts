import { Product } from "../../products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "categories"
})

export class Category {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid("uuid")

    @Column({ type: "varchar", length: 50, nullable: false, unique: true})
    name: string
    
    @OneToMany ( () => Product, (product) => product.category_, { onDelete: "CASCADE"})
    product_: Product[]
}
