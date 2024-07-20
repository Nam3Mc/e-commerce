import { IsString } from "class-validator"

export class PasswordDto{

    @IsString()
    id: string
    @IsString()
    password: string
    @IsString()
    newPassword: string
}