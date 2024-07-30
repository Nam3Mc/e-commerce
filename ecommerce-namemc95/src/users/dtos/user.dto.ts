import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator"
import { MatchPassword } from "../../decorators/matchPassword.decorator"
import { ApiProperty } from "@nestjs/swagger"

export class UserDto {

    @ApiProperty({
        description: "It must be your full namme",
        example: "John Doe"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string

    @ApiProperty({
        description: "Email must be an unique and valid email",
        example: "valid@email.com"
    })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        description: "Password must be minimun 8 charapters long and max 15, it must includes unless, one capital letter, one special charapterand one number",
        example: "my*Passw0rd"
    })
    @IsNotEmpty()
    @IsString()
     @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, 
        { message: "Password must includes, unless one capital leter, one number and one spetial charapter [!@#$%^&*], it mus be minimun 8 charapters long and maximun 15"}
    )
    password: string

    @ApiProperty({
        description: "This password needs to match with password",
        example: "my*Passw0rd"
    })
    @Validate(MatchPassword,["password"])
    confirmPassword: string

    @ApiProperty({
        description: "Your personal address",
        example: "256 Road Street N"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string

    @ApiProperty({
        description: "Phone number must not includes spaces",
        example: "2506983215"
    })
    @IsNotEmpty()
    @IsInt()
    phone: number

    @ApiProperty({
        description: "It could be your current contry",
        example: "Colombia"
    })
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string
    
    @ApiProperty({
        description: "It could be your current city",
        example: "Cucuta"
    })
    @MinLength(5)
    @MaxLength(20)
    @IsString()
    city: string
}