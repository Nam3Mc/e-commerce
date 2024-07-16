import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auths.services";
import { IAuth } from "./interface/auth.interface";
import { credentialsGuard } from "src/guards/authValidator.guard";
import { AuthGuard } from "./auth.guard";

@Controller("auth")

export class AuthsController {
    constructor (private readonly authsService: AuthService) {}

    @Post("signin")
    @UseGuards(credentialsGuard,AuthGuard)
    signIn(@Body() credentials: IAuth) {
        return this.authsService.UserSingIn(credentials);
    }
}
