import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IPersonalInfo} from "./dtos/personalInfo.dto";
import { IPasswordDto } from "./dtos/password.dto";
import { IAddressDto } from "./dtos/address.dto";
import { users } from "src/helpers/dataPreloader";
import { AuthDto } from "src/auth/dtos/auth.dto";

@Injectable()
export class UserRepository {
    
    // Inside constructor we add the database injection from SQL
    // It is declared private and a name is asigned
    constructor(
        @InjectRepository(User)
        private usersDB: Repository<User>
    ) {}

    async getUsers(page: number = 1, limit: number = 5): Promise<Partial<User []>> {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit
        const userIn: User[]= await this.usersDB.find();
        if (userIn.length < 1) {
            for (const user of users) {
            await this.usersDB.save(user)
            }
        }
        return userIn.slice(startIndex, endIndex)
    }     

    async validateCredentials( email: string, password: string ): Promise<boolean> {
        const user: User = await this.usersDB.findOne({
            where: {email: email}
        })
        if (!user) {
            return false
        } else {
            if ( password !== user.password) {
                return false
            }
            return true
        }
    } 

    async getUserById (id: string): Promise<User> {
        const user: User = await this.usersDB.findOne({ 
            where: { id: id},
            relations: ["orders_"]
         })
        return user
    }

    async createUser (user: Partial<User> ): Promise<Partial<User>> {
        const newUser = await this.usersDB.save(user)
        newUser.password = "*".repeat(user.password.length)
        // const { password, ...userWitoutPassword} = newUser;
        return newUser // or user withoutPassword
    }

    async updateUserPersonalInformation (personalInfo: IPersonalInfo): Promise<string> {
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
        await this.usersDB.save(user)
        return user.id
    }

    async updatePassword (passwordUpdate: IPasswordDto): Promise<string> {
        const { id, password, newPassword} = passwordUpdate
        const user = await this.getUserById(id)
        if (user.password !== password) {
            throw new Error ("Password does not match")
        } else {
            user.password = newPassword
            await this.usersDB.save(user)
            return id
        }
    }

    async updateAddress (addressUpdate: IAddressDto): Promise<string>  {
        const { id, address, country, city } = addressUpdate;
        const user = await this.getUserById(id);
        user.address = address
        user.country = country
        user.city = city
        await this.usersDB.save(user)
        return id
    }


    async deleteUser(id: string): Promise<string> {
        const user:User = await this.usersDB.findOneBy({id})
        await this.usersDB.delete(user);
        return user.id
    }
}