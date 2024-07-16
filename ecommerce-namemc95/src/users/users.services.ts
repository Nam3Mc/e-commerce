import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { IUser } from "./interfaces/user.interface";
import { IUserDtoCopy } from "./dtos/user.dto copy";

@Injectable()
export class UserServices {

    constructor(
        private userRepository: UserRepository
    ) {}

    getUsers() {
        return this.userRepository.getUsers();
    }

    getById(id: number) {
        return this.userRepository.getUserById(id);
    }

    createUser(user: IUser): Promise<Omit<IUser, "password">> {
        return this.userRepository.createUser(user);
    }

    updateUser(id: number, user: IUserDtoCopy): Promise<number> {
        return this.userRepository.updateUserInfo(id, user)
    }

    deleteUser(id: number) {
        return this.userRepository.deleteUser(id)
    }
}