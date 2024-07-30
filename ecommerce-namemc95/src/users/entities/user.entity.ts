import { ApiProperty } from "@nestjs/swagger";
import { Order } from "../../orders/entities/order.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "users"
})
export class User {

    @ApiProperty({
        description: "Id is created automatically with a UUID format",
        example: "550e8400-e29b-41d4-a716-446655440000"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ApiProperty({
        description: "The name of the user, with a maximum length of 50 characters",
        example: "John Doe"
    })
    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @ApiProperty({
        description: "The email of the user, must be unique, with a maximum length of 50 characters",
        example: "johndoe@example.com"
    })
    @Column({ type: "varchar", length: 50, unique: true, nullable: false })
    email: string;

    @ApiProperty({
        description: "The password of the user",
        example: "SecureP@ssw0rd!"
    })
    @Column({ type: "varchar", nullable: false })
    password: string;

    @ApiProperty({
        description: "The phone number of the user",
        example: "1234567890"
    })
    @Column("bigint")
    phone: number;

    @ApiProperty({
        description: "The country of the user, with a maximum length of 50 characters",
        example: "United States"
    })
    @Column({ type: "varchar", length: 50 })
    country: string;

    @ApiProperty({
        description: "The address of the user",
        example: "123 Main St, Apt 4B"
    })
    @Column({ type: "text" })
    address: string;

    @ApiProperty({
        description: "The city of the user, with a maximum length of 50 characters",
        example: "New York"
    })
    @Column({ type: "varchar", length: 50 })
    city: string;

    @ApiProperty({
        description: "The orders placed by the user",
        example: [
            {
                id: "1",
                product: "Laptop",
                quantity: 1
            },
            {
                id: "2",
                product: "Mouse",
                quantity: 2
            }
        ]
    })
    @OneToMany(() => Order, (order) => order.user_)
    @JoinColumn()
    orders_: Order[];
    
    @ApiProperty({
        description: "Roles are used to provide special access. There are 2 types: ADMIN and USER. It is not required and is set to 'user' by default",
        example: "user"
    })
    @Column({ default: "user" })
    roll: string;
}
