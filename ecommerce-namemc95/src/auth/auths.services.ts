import { Injectable } from "@nestjs/common";
import { AuthsRepository } from "./auths.repository";
import { IAuth } from "./interface/auth.interface";

@Injectable()

export class AuthService {

    constructor( 
        private authsRepository: AuthsRepository ) {}

    UserSingIn(credentials: IAuth) {
        return this.authsRepository.authSingIn(credentials);
    }
}