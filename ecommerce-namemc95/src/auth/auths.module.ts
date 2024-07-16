import { Module } from "@nestjs/common";
import { AuthService } from "./auths.services";
import { AuthsController } from "./auths.controllers";
import { AuthsRepository } from "./auths.repository";
import { UserRepository } from "src/users/users.repository";

@Module({
    providers: [AuthService, AuthsRepository, UserRepository],
    controllers: [AuthsController],
})

export class AuthModels {};