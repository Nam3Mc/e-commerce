import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/users/users.repository";
import { AuthDto } from "./dtos/auth.dto";

@Injectable()
export class AuthRepository {
    constructor( private userRepository: UserRepository) {}

    async authValidator(auth: AuthDto) {
        const {email, password} = auth
        const isAuthorized = await this.userRepository.validateCredentials(email, password)
        if (!isAuthorized) {
            return ("Invalid Email or Password")
        } else {
            return ("You have logged successfuly")
        }
    }

}