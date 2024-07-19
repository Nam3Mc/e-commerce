import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "categories"
})

export class Category {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid("uuid")

    @Column({ length: 50, nullable: true })
    name: string

    // according with documentations products may have multiple categories
    // but each categty just own one product at time 
    // because that here will be the row with information 
    @ManyToOne ( () => Product, (product) => product.category_)
    product_: Product
}
