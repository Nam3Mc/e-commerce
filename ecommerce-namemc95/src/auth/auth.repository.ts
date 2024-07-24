import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthDto } from "./dtos/auth.dto";
import * as bcrypt from "bcrypt"
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class AuthRepository {

    async authValidator(auth: AuthDto) {
    }

    async signUp(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10)
        if (!hashedPassword) {
            throw new BadRequestException("Password could not be hashed")
        }
        else {
            return hashedPassword
        }
    }

    async signIn(passwordDB: string, password: string) {
        const validatedPassword = await bcrypt.compare(password, passwordDB)
        if (!validatedPassword) {
            throw new NotFoundException("Email or password incorrect")
        }
        else {
            return ("User loggued successfuly")
        }
    }
}