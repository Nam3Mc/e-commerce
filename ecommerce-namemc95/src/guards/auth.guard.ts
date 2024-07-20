import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
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
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        return validateRequest(request)
    }
}