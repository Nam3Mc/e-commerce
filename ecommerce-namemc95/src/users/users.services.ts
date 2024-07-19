import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { User } from "./entities/user.entity";
import { IPersonalInfo } from "./dtos/personalInfo.dto";

@Injectable()
export class UserServices {

    constructor(
        private userRepository: UserRepository
    ) {}

    getUsers(): Promise<User[]> {
        return this.userRepository.getUsers();
    }

    getById(id: string) {
        return this.userRepository.getUserById(id);
    }

    createUser(user: User): Promise<Partial<User>> {
        return this.userRepository.createUser(user);
    }

    updatePersonalInfo(personalInfo: IPersonalInfo): Promise<void> {
        return  this.userRepository.updateUserPersonalInformation(personalInfo)
    }

    deleteUser(id: string) {
        return this.userRepository.deleteUser(id)
    }
}