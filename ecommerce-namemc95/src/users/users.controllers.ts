import { Body, Controller,Delete,Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserServices } from "./users.services";
import { UserGuard } from "src/guards/userCreator.guard";
import { User as UserEntity } from "./entities/user.entity";
import { PersonalInfoDto } from "./dtos/personalInfo.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { PasswordInterceptor } from "src/interceptors/password.interceptor";
import { PasswordDto } from "./dtos/password.dto";
import { AddressDto } from "./dtos/address.dto";
import { UserDto } from "./dtos/user.dto";


@Controller("users")

export class UserControllers {
    constructor(private readonly userService: UserServices

    ) {}

    @Get()
    @UseGuards(AuthGuard)
    @UseInterceptors(PasswordInterceptor)
    getUser(@Query("page") page: number, @Query("limit") limit: number) {
        return this.userService.getUsers(page, limit);
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    getUserById(@Param("id") id: string) {
        return this.userService.getById(id);
    }

    @Post()
    @UseGuards(UserGuard)
    createUser(
        @Body() user: UserDto) {
        return this.userService.createUser(user);
    }

    @Put("userinfo/:id") 
    @UseGuards(AuthGuard,)
    updateUser( @Param("id") id: string, @Body() personalInfo: PersonalInfoDto) {
        return this.userService.updatePersonalInfo( personalInfo)
    }
        
    @Put("userpassword/:id") 
    @UseGuards(AuthGuard)
    updatePassword(@Body() passwordUpdate: PasswordDto, ) {
        return this.userService.updatePassword(passwordUpdate)
    }

    @Put("useraddress/:id") 
    @UseGuards(AuthGuard)
    updateAddress(@Body() addressUpdate: AddressDto) {
        return this.userService.updateAddress(addressUpdate);
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    delteUser(@Param("id") id: string) {
        return this.userService.deleteUser(id)
    }
}    