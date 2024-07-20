import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { User } from "./entities/user.entity";
import { IPersonalInfo } from "./dtos/personalInfo.dto";
import { IPasswordDto } from "./dtos/password.dto";
import { IAddressDto } from "./dtos/address.dto";

@Injectable()
export class UserServices {

    constructor(
        private userRepository: UserRepository
    ) {}

    getUsers(page: number, limit: number): Promise<User[]> {
        return this.userRepository.getUsers(page, limit);
    }

    getById(id: string) {
        return this.userRepository.getUserById(id);
    }

    createUser(user: User): Promise<Partial<User>> {
        return this.userRepository.createUser(user);
    }

    updatePersonalInfo(personalInfo: IPersonalInfo): Promise<string> {
        return this.userRepository.updateUserPersonalInformation(personalInfo)
    }

    updatePassword(passwordUpdate: IPasswordDto): Promise<string> {
        return this.userRepository.updatePassword(passwordUpdate)
    }

    updateAddress(addressUpdate: IAddressDto): Promise<string> {
        return this.userRepository.updateAddress(addressUpdate)
    }

    deleteUser(id: string): Promise<string> {
        return this.userRepository.deleteUser(id)
    }
}