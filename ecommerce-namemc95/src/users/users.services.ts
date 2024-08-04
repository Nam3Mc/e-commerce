import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { User } from "./entities/user.entity";
import { PersonalInfoDto } from "./dtos/personalInfo.dto";
import { PasswordDto } from "./dtos/password.dto";
import { AddressDto } from "./dtos/address.dto";

@Injectable()
export class UserServices {

    constructor(
        private userRepository: UserRepository
    ) {}

    getUsers(page: number, limit: number): Promise<User[]> {
        return this.userRepository.getUsers(page, limit);
    }

    getUserById(id: string): Promise<Partial<User>> {
        return this.userRepository.getUserById(id);
    }

    updatePassword(id: string, passwordUpdate: PasswordDto): Promise<string> {
        return this.userRepository.updatePassword(id, passwordUpdate)
    }

    updateAddress(id: string, addressUpdate: AddressDto): Promise<string> {
        return this.userRepository.updateAddress(id, addressUpdate)
    }

    deleteUser(id: string): Promise<string> {
        return this.userRepository.deleteUser(id)
    }
}