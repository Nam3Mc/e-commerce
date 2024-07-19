import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "categories"
})

export class Category {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid("uuid")

    @Column(
        {
            length: 50,
            nullable: true
        }
    )
    name: string

    @OneToOne( () => Product)
    @JoinColumn()
    product_: Product
    
}
