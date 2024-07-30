import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { AuthDto } from "src/auth/dtos/auth.dto";

// this code is to verify any request received to add new products 
//  the product needs to macth the interface without id
const validateCredentials = (request: Request) => {
    const expectedKeys: (keyof AuthDto)[] = [
        "email",
        "password"
    ];

    // here we received the information throught body
    const credentials: AuthDto = request.body;
    const credentialsKeys = Object.keys(credentials) as (keyof AuthDto)[];

    // First we verify if all teh keys are present
    for (const key of expectedKeys) {
        if (!credentials[key]) {
            return false;
        }
    }

    // then verify if there is any extra key 
    for (const key of credentialsKeys) {
        if (!expectedKeys.includes(key)) {
            return false;
        }
    }

    return true;
}

@Injectable()
export class credentialsGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateCredentials(request);
    }
}
