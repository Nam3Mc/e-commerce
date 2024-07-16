import { Module } from "@nestjs/common";
import { UserServices } from "./users.services";
import { UserControllers } from "./users.controllers";
import { UserRepository } from "./users.repository";

@Module({
    providers: [UserServices, UserRepository],
    controllers: [UserControllers]
})

export class UserModules{};