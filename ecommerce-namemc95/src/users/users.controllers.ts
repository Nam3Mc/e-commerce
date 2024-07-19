import { Body, Controller,Delete,Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserServices } from "./users.services";
import { UserGuard } from "src/guards/userCreator.guard";
import { User as UserEntity } from "./entities/user.entity";
import { IPersonalInfo } from "./dtos/personalInfo.dto";
import { AuthGuard } from "src/guards/auth.guard";


@Controller("users")

export class UserControllers {
    constructor(private readonly userService: UserServices

    ) {}

    @Get()
    @UseGuards(AuthGuard)
    getUser() {
        return this.userService.getUsers();
    }

    @Get(":id")
    getUserById(@Param("id") id: string) {
        return this.userService.getById(id);
    }

    @Post()
    @UseGuards( )
    createUser(
        @Body() user: UserEntity) {
        return this.userService.createUser(user);
    }

    @Put(":id") 
    @UseGuards(UserGuard, AuthGuard)
    updateUser(@Param("id") id: string, @Body() personalInfo: IPersonalInfo) {
        return this.userService.updatePersonalInfo( personalInfo)
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    delteUser(@Param("id") id: string) {
        return this.userService.deleteUser(id)
    }
}    