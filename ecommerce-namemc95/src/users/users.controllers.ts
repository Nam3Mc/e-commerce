import { Body, Controller,Delete,Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserServices } from "./users.services";
import { IUser } from "./interfaces/user.interface";
import { UserGuard } from "src/guards/userCreator.guard";
import { IUserDtoCopy } from "./dtos/user.dto copy";
import { AuthGuard } from "src/auth/auth.guard";


@Controller("users")

export class UserControllers {
    constructor(private readonly userService: UserServices) {}

    @Get()
    @UseGuards(AuthGuard)

    getUser() {
        return this.userService.getUsers();
    }

    @Get(":id")
    getUserById(@Param("id") id: string) {
        return this.userService.getById(Number(id));
    }

    @Post()
    @UseGuards(UserGuard, AuthGuard)
    createUser(@Body() user: IUser) {
        return this.userService.createUser(user);
    }

    @Put(":id") 
    @UseGuards(UserGuard, AuthGuard)
    updateUser(@Param("id") id: string, @Body() user: IUserDtoCopy) {
        console.log(user, id)
        return this.userService.updateUser(Number(id), user)
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    delteUser(@Param("id") id: string) {
        return this.userService.deleteUser(Number(id))
    }
}    