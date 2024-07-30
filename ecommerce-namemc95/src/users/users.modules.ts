import { Module } from "@nestjs/common";
import { UserServices } from "./users.services";
import { UserControllers } from "./users.controllers";
import { UserRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

@Module({
    // whit this config we will conect the DB with our app
    // in for fracture we wil tell what entities we want to bring 
    imports: [
        TypeOrmModule.forFeature([User])
    ],

    providers: [UserServices, UserRepository],
    controllers: [UserControllers],
    exports: [UserRepository]
})

export class UserModules{};