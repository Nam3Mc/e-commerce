import { table } from "console";
import { Category } from "src/categories/entities/category.entity";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "products"
})
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid(); 

    @Column({ type: "varchar", length: 50, nullable: false, unique: true})
    name: string
    
    @Column({ type: "text", nullable: false })
    description: string

    @Column( "decimal", { precision: 10, scale: 2, nullable: false })
    price: number

    @Column({nullable: false })
    stock: number

    @Column({ type: "text", default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjTeYUVmOczg3JN3PsE7QVwrdF_EwnbL0gAA&s" })
    imgUrl: string

    // in this case the rowwill be addded to categories 
    // who onws each product
    @ManyToOne( () => Category, (category) => category.product_ )
    // @JoinColumn()
    category_: Category
    
}

// products has a relation manyToMany with order-details and 
// order details will have the join table and will cal the prodcts array 