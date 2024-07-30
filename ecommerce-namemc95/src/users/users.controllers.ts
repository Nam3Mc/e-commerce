import { Body, Controller,Delete,Get, Param, ParseUUIDPipe, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserServices } from "./users.services";
import { PersonalInfoDto } from "./dtos/personalInfo.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { PasswordInterceptor } from "src/interceptors/password.interceptor";
import { PasswordDto } from "./dtos/password.dto";
import { AddressDto } from "./dtos/address.dto";
import { Request } from "express";
import { User } from "./entities/user.entity";
import { Rolls } from "src/decorators/rolls.decorator";
import { Roll } from "src/enums/rolls.enum";
import { RollsGuard } from "src/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UserControllers {
    constructor(private readonly userService: UserServices

    ) {}

    @ApiBearerAuth()
    @Get()
    @Rolls(Roll.Admin)
    @UseGuards(AuthGuard, RollsGuard)
    @UseInterceptors(PasswordInterceptor)
    getUser(@Query("page") page: number, @Query("limit") limit: number, @Req() reuquest: Request & {user:User}) {
        
        console.log(reuquest.user)

        return this.userService.getUsers(page, limit);
    }

    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard)
    async getUserById(@Param("id", ParseUUIDPipe) id: string) {
        return await this.userService.getUserById(id);
    }

    @ApiBearerAuth()
    @Put("userinfo/:id") 
    @UseGuards(AuthGuard,)
    updateUser( @Param("id") id: string, @Body() personalInfo: PersonalInfoDto) {
        return this.userService.updatePersonalInfo( personalInfo)
    }
        
    @ApiBearerAuth()
    @Put("userpassword/:id") 
    @UseGuards(AuthGuard)
    updatePassword(@Body() passwordUpdate: PasswordDto, ) {
        return this.userService.updatePassword(passwordUpdate)
    }

    @ApiBearerAuth()
    @Put("useraddress/:id") 
    @UseGuards(AuthGuard)
    updateAddress(@Body() addressUpdate: AddressDto) {
        return this.userService.updateAddress(addressUpdate);
    }

    @ApiBearerAuth()
    @Delete(":id")
    @UseGuards(AuthGuard)
    delteUser(@Param("id") id: string) {
        return this.userService.deleteUser(id)
    }
}    