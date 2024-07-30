import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class AuthDto {

    @IsEmail()
    @ApiProperty({
        description: "Email must be related with an account",
        example: "valid@email.com"
    })
    email: string

    @IsString()
    @ApiProperty({
        description: "Password must be a valid password",
        example: "my*Passw0rd"
    })
    password: string
}