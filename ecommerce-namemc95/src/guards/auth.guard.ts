import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

function validateRequest(request) {

    // the heared is received we separate it in a const
    // const authorization = request.headers.authorization;

    // if (!authorization) {
        // return "There is not authorization available"
    // } else {
        //  headre has this form ["Basic:", "email@email:password" ]
        // we split it by space " " and wrap the second element index 1
        // const credentials = authorization.split(" ")[`1`]; //"email@email:password" 

        // then we split "email@email:password"  by ":" and set each to a value
        // with this onformation we can verify each to autorize or not
        // const [ email, password] = credentials.split(":");

        // then we can add logic to verify
        return true
    // }
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor( 
        private readonly jwtService: JwtService
    ) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {


        const request = context.switchToHttp().getRequest();
        const token = request.headers["authorization"]?.split(" ")[1] ?? "";
        if (!token) {
            throw new UnauthorizedException("Bearer Token not found") 
        }
        
        try {
            const secret = process.env.JWT_SECRET
            const payload = this.jwtService.verify(token, {secret})
            payload.iat = new Date(payload.iat * 1000);
            payload.exp = new Date(payload.exp * 1000);
            payload.roles = ["admin"]
            request.user = payload
            return true 
        } catch (error) {
            throw new UnauthorizedException("Invalid token")
        }
    }
}