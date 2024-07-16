import { Injectable } from "@nestjs/common";
import { IUser } from "./interfaces/user.interface";
import { IUserDtoCopy } from "./dtos/user.dto copy";
import { IUserDto } from "./dtos/user.dto";
import { IAuth } from "src/auth/interface/auth.interface";

@Injectable()
export class UserRepository {

    private users: IUser[] = [
        {
            id: 1,
            email: "user1@example.com",
            name: "User One",
            password: "password1",
            address: "123 Main St",
            phone: "+1234567890",
            country: "Country A",
            city: "City X"
        },
        {
            id: 2,
            email: "user2@example.com",
            name: "User Two",
            password: "password2",
            address: "456 Elm St",
            phone: "+1987654321",
            country: "Country B",
            city: "City Y"

        },
        {
            id: 3,
            email: "user3@example.com",
            name: "User Three",
            password: "password3",
            address: "789 Oak St",
            phone: "+1122334455",
            country: "Country C",
            city: "City Z"
        }
    ]
    
    async getUsers(): Promise<IUserDto []> {

        const usersWitoutPassword: Omit<IUser, "password"> [] = []

        for (const user of this.users) {
            const {password, ...userWithoutPassword} = user
            usersWitoutPassword.push(userWithoutPassword)
        }

        return usersWitoutPassword
    }

    async getUserCredentials( email: string): Promise<IAuth> {
        const user: IUser = await this.users.find( (user) => user.email === email)
        if (!user) {
            throw new Error("Email or Password Incorrect")
        } else {
            const credentials: IAuth = {email: user.email, password: user.password}
            return  credentials;
        }
    } 

    async getUserById (id: number) {
        return this.users.find( (user) => user.id === id);
    }

    async createUser (user: Omit<IUser, "id"> ): Promise<Omit<IUser, "password">> {
        const id = this.users.length + 1;
        const newUser = {id, ...user}
        this.users.push(newUser)
        const { password, ...userWitoutPassword} = newUser;
        return userWitoutPassword
    }

    async updateUserInfo (id: number, user: IUserDtoCopy): Promise<number> {

        const { email, name, password, phone, country, city} = user
        const updateUser = this.users.find((user) => user.id === id);

        updateUser.id = id;
        updateUser.email = email;
        updateUser.name = name;
        updateUser.password = password;
        updateUser.phone = phone;
        updateUser.country = country;
        updateUser.city = city;

        return id
    }

    async deleteUser(id: number) {
        const user = this.users.findIndex((user) => user.id === id)
        this.users.splice(user, 1);
    }

}