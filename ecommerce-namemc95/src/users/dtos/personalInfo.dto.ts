import { IsEmail, IsInt, IsString } from "class-validator"

export class PersonalInfoDto {

    @IsString()
    name: string
    @IsEmail()
    email: string
    @IsInt()
    phone: number
}