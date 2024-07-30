import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { UserDto } from "src/users/dtos/user.dto";
import { UserRepository } from "src/users/users.repository";
import { User } from "src/users/entities/user.entity";
import { AuthDto } from "./dtos/auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthRepository {

    constructor( 
        private userRepository: UserRepository,
        private jswService: JwtService
    ) {}

    async signUp(userDto: UserDto): Promise<Partial<User>> {
        const userExist: boolean = await this.userRepository.validateEmail(userDto.email)

        if (userExist) {
            throw new BadRequestException("Email is already in use")
        }
        else {
            const hashedPassword: string = await bcrypt.hash(userDto.password, 10)
            const newUser = new User;
            newUser.email = userDto.email
            newUser.name = userDto.name
            newUser.password = hashedPassword
            newUser.phone = userDto.phone
            newUser.address = userDto.address
            newUser.country = userDto.country
            newUser.city = userDto.city
            const createdUser: Partial<User> = await this.userRepository.createUser(newUser)
            return  createdUser
        }
    }

    async signIn(authDto: AuthDto) {
        const user: User = await this.userRepository.getUserByEmail(authDto.email)
        const validatedPassword = await bcrypt.compare(authDto.password, user.password)
        if (!validatedPassword) {
            throw new NotFoundException("Email or password incorrect")
        }
        else {
            const userPayLoad = {
                sub: user.id,
                id: user.id,
                email: user.email,
                roll: user.roll
            }
            console.log(user.roll)
            const token = this.jswService.sign(userPayLoad)
            return {success: "User loggued successfuly", token} 
        }
    }
}