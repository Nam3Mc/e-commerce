import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { IUser } from "src/users/interfaces/user.interface";

const validateNewUser = (request: Request) => {

    const expectedKeys: (keyof IUser)[] =[
        "email",
        "name",
        "password",
        "address",
        "phone",
        "country",
        "city"
    ];

    const user: Omit<IUser, "id"> = request.body;
    const userKeys = Object.keys(user) as (keyof IUser)[];

    for (const key of expectedKeys) {
        if (!user[key]) {
            return false
        }
    }

    for (const key of userKeys) {
        if (!expectedKeys.includes(key)) {
            return false
        }
    }
    return true
}

@Injectable()
export class UserGuard implements CanActivate{

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest()
        console.log(request);
        return validateNewUser(request)
    }
}