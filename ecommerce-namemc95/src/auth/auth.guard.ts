import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express"
import { Observable } from "rxjs";

const authValidator = (request: Request) => {

    const token = request.headers["authorization"];
    return token === "email:password"
    
}

@Injectable() 
export class AuthGuard implements CanActivate {

    canActivate(context: ExecutionContext,

    ): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest();
        return authValidator(request);
    }
}