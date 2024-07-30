import { Product } from "../../products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: "order_details"
})
export class OrderDetail {
    @ApiProperty({
        description: "Id is created automatically with a UUID format",
        example: "550e8400-e29b-41d4-a716-446655440000"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();

    @ApiProperty({
        description: "The price of the order detail item, with up to 10 digits and 2 decimal places",
        example: "999.99"
    })
    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    price: number;

    @ApiProperty({
        description: "The products associated with the order detail. This establishes a many-to-many relationship with the Product entity. Each order detail can include multiple products, and each product can be part of multiple order details.",
        example: [
            {
                id: "1",
                name: "Laptop",
                description: "A high-performance laptop",
                price: 999.99,
                stock: 50,
                imgUrl: "https://example.com/laptop.jpg",
                category: {
                    id: "1",
                    name: "Electronics"
                }
            },
            {
                id: "2",
                name: "Mouse",
                description: "A wireless mouse",
                price: 19.99,
                stock: 200,
                imgUrl: "https://example.com/mouse.jpg",
                category: {
                    id: "1",
                    name: "Electronics"
                }
            }
        ]
    })
    @ManyToMany(() => Product)
    @JoinTable()
    product_: Product[];
}
