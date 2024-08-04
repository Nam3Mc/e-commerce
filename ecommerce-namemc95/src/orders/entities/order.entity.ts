import { File } from "../../files/entities/files.entity";
import { OrderDetail } from "../../order-details/entities/order-detail.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: "orders"
})
export class Order {

    @ApiProperty({
        description: "Id is created automatically with a UUID format",
        example: "550e8400-e29b-41d4-a716-446655440000"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();

    @ApiProperty({
        description: "The date the order was placed",
        example: "2024-07-30"
    })
    @Column()
    date: string;

    @ApiProperty({
        description: "The user who placed the order. This establishes a many-to-one relationship with the User entity. Each order is placed by a single user, but a user can place multiple orders.",
        example: {
            id: "550e8400-e29b-41d4-a716-446655440000",
            name: "John Doe",
            email: "johndoe@example.com"
        }
    })
    @ManyToOne(() => User, (user) => user.orders_, { onDelete: "CASCADE"})
    user_: Partial<User>;

    @ApiProperty({
        description: "The details of the order. This establishes a one-to-one relationship with the OrderDetail entity. Each order has a single set of order details.",
        example: {
            id: "1",
            product: "Laptop",
            quantity: 1,
            price: 999.99
        }
    })
    @OneToOne(() => OrderDetail, {cascade: true, onDelete: "CASCADE"})
    @JoinColumn()
    orderDetails_: OrderDetail;

    @ApiProperty({
        description: "The files associated with the order. This establishes a one-to-many relationship with the File entity. Each order can have multiple associated files, but each file is associated with a single order.",
        example: [
            {
                id: "1",
                url: "https://example.com/file1.pdf"
            },
            {
                id: "2",
                url: "https://example.com/file2.pdf"
            }
        ]
    })
    @OneToMany(() => File, (file) => file.order_)
    files_: File[];
}
