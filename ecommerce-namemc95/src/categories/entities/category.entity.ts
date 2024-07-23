import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "categories"
})

export class Category {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid("uuid")

    @Column({ type: "varchar", length: 50, nullable: false, unique: true})
    name: string

    // according with documentations products may have multiple categories
    // but each categty just own one product at time 
    // because that here will be the row with information 
    @OneToMany ( () => Product, (product) => product.category_)
    product_: Product[]
}
