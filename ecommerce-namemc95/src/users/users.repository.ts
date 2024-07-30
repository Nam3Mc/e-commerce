import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PersonalInfoDto} from "./dtos/personalInfo.dto";
import { PasswordDto } from "./dtos/password.dto";
import { AddressDto } from "./dtos/address.dto";
import { users } from "src/helpers/dataPreloader";

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

    async validateEmail( email: string): Promise<boolean> {
        const user: User = await this.usersDB.findOne({
            where: {email: email}
        })
        
        if (!user) {
            return false
        } else {
            return true
        }
    }

    async getUserByEmail (email: string): Promise<User> {
        const user: User = await this.usersDB.findOne({
            where: {email: email}
        })
                
        if (!user) {
            throw new NotFoundException("as")
        } else {
            return user   
        }
    }

    async getUserById (id: string): Promise<User> {
        return await this.usersDB.findOne({ 
            where: {  id: id },
            relations: ["orders_"]
        })
    }

    async createUser (user: User ): Promise<Partial<User>> {
        const createdUser = await this.usersDB.save(user)
        const {password, ...userWhithoutPassword} = createdUser
            return userWhithoutPassword
    }

    async updateUserPersonalInformation (id: string, personalInfo: PersonalInfoDto): Promise<string> {
        const {name, email, phone} = personalInfo
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

    async updatePassword (id: string, passwordUpdate: PasswordDto): Promise<string> {
        const { password, newPassword, newPaswordConfirmation} = passwordUpdate
        const user = await this.getUserById(id)
        if (user.password !== password) {
            throw new Error ("Password does not match")
        } else {
            user.password = newPassword
            await this.usersDB.save(user)
            return id
        }
    }

    async updateAddress (id: string, addressUpdate: AddressDto): Promise<string>  {
        const { address, country, city } = addressUpdate;
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