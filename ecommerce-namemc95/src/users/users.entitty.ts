import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuid } from "uuid";

@Entity({
    name: "users"
})

export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();

    @Column()
    email: string
    
    @Column()
    name: string

    @Column()
    password:string

    @Column()
    address: string

    @Column()
    phone: string

    @Column()
    country: string

    @Column()
    city: string
    
}