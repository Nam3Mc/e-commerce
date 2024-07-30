import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsInt, IsString } from "class-validator"

export class PersonalInfoDto {

    @ApiProperty({
        description: "Users are able to modify their personal information apart of their password",
        example: "John Doe Thomson"
    })
    @IsString()
    name: string

    @ApiProperty({
        description: "Email is included in personal information",
        example: "valideamil2@email.com"
    })
    @IsEmail()
    email: string

    @ApiProperty({
        description: "phone number is able to be modified",
        example: 3028762976
    })
    @IsInt()
    phone: number
}