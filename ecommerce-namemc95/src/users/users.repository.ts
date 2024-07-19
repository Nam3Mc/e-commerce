import { Injectable } from "@nestjs/common";
import { IAuth } from "src/auth/interface/auth.interface";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IPersonalInfo} from "./dtos/personalInfo.dto";
import { IPasswordDto } from "./dtos/password.dto";
import { IAddressDto } from "./dtos/address.dto";

@Injectable()
export class UserRepository {
    
    // in constructor is where we need to inject our DB entity
    constructor(
        // this line injetable works calling the entity in oir DB
        @InjectRepository(User)
        // then we need to declare our DB name
        private usersDB: Repository<User>
    ) {}
    
    async getUsers(): Promise<Omit<User [], "password">> {



        // pages the first number is the page 
        // second number limit per pages
        const start = 1 * 5
        const end = start + 5

        const users: User[] = (await this.usersDB.find()).slice(start, end);
        return users
    }

    async getUserCredentials( email: string): Promise<IAuth> {
        const user: User = await this.usersDB.findOne({
            where: {email: email}
        })
        if (!user) {
            throw new Error("Email or Password Incorrect")
        } else {
            const credentials: IAuth = {email: user.email, password: user.password}
            return  credentials;
        }
    } 

    async getUserById (id: string): Promise<User> {
        const user: User = await this.usersDB.findOne({ 
            where: { id: id}
         })
        return user
    }

    async createUser (user: Omit<User, "id, order" > ): Promise<Omit<User, "password">> {
        this.usersDB.save(user)
        const { password, ...userWitoutPassword} = user;
        return userWitoutPassword
    }

    async updateUserPersonalInformation (personalInfo: IPersonalInfo): Promise<void> {

        // destructuring on personal infor reived
        const {name, email, phone} = personalInfo
        // getting the user by email
        const user: User = await this.usersDB.findOne({
            where: {email: email}
        })

        // asigning new values 
        user.name = name
        user.email = email
        user.phone = phone

        // sseving user's changes
        this.usersDB.save(user)

        console.log(user)
    }

    async updatePassword (passwordUpdate: IPasswordDto): Promise<void> {
        
        const { id, password, newPassword} = passwordUpdate
        const user = await this.getUserById(id)
        if (user.password !== password) {
            throw new Error ("Password does not match")
        } else {
            user.password = newPassword
            this.usersDB.save(user)
        }
    }

    async updateAddress (addressUpdate: IAddressDto): Promise<void>  {

        const { id, address, country, city } = addressUpdate;
        const user = await this.getUserById(id);

        user.address = address
        user.country = country
        user.city = city

        this.usersDB.save(user)
    }


    async deleteUser(id: string): Promise<void> {
        const user = await this.usersDB.findOneBy({id})
        this.usersDB.delete(user);
        console.log("User deleted")
    }

    async saveOrder(data): Promise<void> {
       await this.usersDB.save(data)
    } 
}