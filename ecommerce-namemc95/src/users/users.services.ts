import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { User } from "./entities/user.entity";
import { PersonalInfoDto } from "./dtos/personalInfo.dto";
import { PasswordDto } from "./dtos/password.dto";
import { AddressDto } from "./dtos/address.dto";
import { UserDto } from "./dtos/user.dto";
import { AuthDto } from "src/auth/dtos/auth.dto";

@Injectable()
export class UserServices {

    constructor(
        private userRepository: UserRepository
    ) {}

    getUsers(page: number, limit: number): Promise<User[]> {
        return this.userRepository.getUsers(page, limit);
    }

    getUserById(id: string): Promise<User> {
        return this.userRepository.getUserById(id);
    }

    createUser(user: UserDto): Promise<Partial<User>> {
        return this.userRepository.createUser(user);
    }

    signIn(credentials: AuthDto) {
        return this.userRepository.signIn(credentials);
    }

    updatePersonalInfo(personalInfo: PersonalInfoDto): Promise<string> {
        return this.userRepository.updateUserPersonalInformation(personalInfo)
    }

    updatePassword(passwordUpdate: PasswordDto): Promise<string> {
        return this.userRepository.updatePassword(passwordUpdate)
    }

    updateAddress(addressUpdate: AddressDto): Promise<string> {
        return this.userRepository.updateAddress(addressUpdate)
    }

    deleteUser(id: string): Promise<string> {
        return this.userRepository.deleteUser(id)
    }
}