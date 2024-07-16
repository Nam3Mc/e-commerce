import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { IAuth } from "./interface/auth.interface";
import { UserRepository } from "src/users/users.repository";

@Injectable()
export class AuthsRepository{

    constructor (private readonly userRepository: UserRepository) {}

    async authSingIn (credentials: IAuth) {

        const { email, password} = credentials

        try {
            const user = await this.userRepository.getUserCredentials(email);

            if (user && user.password === password) {
                return ("You have logged successfuly")
            } else {
                throw new UnauthorizedException("Email or password incorrect")
            }

        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error
            } else {
                throw new InternalServerErrorException("Email or password incorrect")
            }
        }
    }
}