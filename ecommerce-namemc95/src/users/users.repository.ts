import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PasswordDto } from "./dtos/password.dto";
import { AddressDto } from "./dtos/address.dto";
import * as bcrypt from "bcrypt"
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class UserRepository {
    
    constructor(
        @InjectRepository(User)
        private usersDB: Repository<User>,
    ) {}

    async getUsers(page: number = 1, limit: number = 5): Promise<Partial<User []>> {
        const usersList: User[]= await this.usersDB.find({
            skip: (page - 1) * limit,
            take: limit
        });

        return usersList
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
            throw new NotFoundException("User could not be found")
        } else {
            return user
        }
    }

    async getUserById (id: string): Promise<Partial<User>> {
        const user = await this.usersDB.findOne({ 
            where: {  id: id },
            relations: ["orders_"] 
        })
        if (!user) {
            throw new NotFoundException("User could not be found")
        }
        const {password, roll, ...userWithoutPassword} = user
        return userWithoutPassword
    }

    async createUser (user: User ): Promise<Partial<User>> {
        const createdUser = await this.usersDB.save(user)
        const {password, roll, ...userWhithoutPassword} = createdUser
            return userWhithoutPassword
    }

    async updatePassword (id: string, passwordUpdate: PasswordDto): Promise<string> {
        const { password, newPassword, newPaswordConfirmation} = passwordUpdate;
        const user = await this.usersDB.findOne({ where: {id}})
        const validatedPassword = await bcrypt.compare(password, user.password)
        if (!validatedPassword) {
            throw new BadRequestException("Current password does not match")
        }
        else {
            if (newPassword !== newPaswordConfirmation) {
                throw new BadRequestException("New password does not match")
            }
            else {
                const hashedPassword = await bcrypt.hash(newPassword, 10)
                user.password = hashedPassword
                await this.usersDB.save(user)
                return "Password Updated"
            }
        }
    }

    async updateAddress (id: string, addressUpdate: AddressDto): Promise<string>  {
        const { address, country, city } = addressUpdate;
        const user = await this.getUserById(id);
        if (!user) {
            throw new BadRequestException("User could not be found")
        } else {

            user.address = address
            user.country = country
            user.city = city
            await this.usersDB.save(user)
            return `User ${user.name}'s address updated`
        }
    }


    async deleteUser(id: string): Promise<string> {
        const user:User = await this.usersDB.findOneBy({id})
        if (!User) {
            throw new NotFoundException("User does not exist")
        }
        await this.usersDB.delete(user);
        return (`User with ID: ${user.id}, was deleted`)
    }
}