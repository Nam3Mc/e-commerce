import { Category } from "../../categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: "products"
})
export class Product {

    @ApiProperty({
        description: "Id is created automatically with a UUID format",
        example: "550e8400-e29b-41d4-a716-446655440000"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();

    @ApiProperty({
        description: "The name of the product, with a maximum length of 50 characters, must be unique",
        example: "Laptop"
    })
    @Column({ type: "varchar", length: 50, nullable: false, unique: true })
    name: string;

    @ApiProperty({
        description: "The description of the product",
        example: "A high-performance laptop suitable for all your computing needs"
    })
    @Column({ type: "text", nullable: false })
    description: string;

    @ApiProperty({
        description: "The price of the product, with up to 10 digits and 2 decimal places",
        example: "999.99"
    })
    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    price: number;

    @ApiProperty({
        description: "The stock quantity of the product",
        example: 50
    })
    @Column({ nullable: false })
    stock: number;

    @ApiProperty({
        description: "The URL of the product image",
        example: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjTeYUVmOczg3JN3PsE7QVwrdF_EwnbL0gAA&s"
    })
    @Column({ type: "text", default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjTeYUVmOczg3JN3PsE7QVwrdF_EwnbL0gAA&s" })
    imgUrl: string;

    @ApiProperty({
        description: "The category to which the product belongs"
    })
    @ManyToOne(() => Category, (category) => category.product_)
    category_: Category;
}
