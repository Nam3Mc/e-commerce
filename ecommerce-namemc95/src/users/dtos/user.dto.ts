import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "../../decorators/matchPassword.decorator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {

    @ApiProperty({
        description: "It must be your full name, between 3 and 80 characters.",
        example: "John Doe"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @ApiProperty({
        description: "Email must be a unique and valid email.",
        example: "valid@email.com"
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Password must be between 8 and 15 characters long, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
        example: "my*Passw0rd"
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, 
        { message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character [!@#$%^&*]. It must be between 8 and 15 characters long." }
    )
    password: string;

    @ApiProperty({
        description: "This password needs to match the password field.",
        example: "my*Passw0rd"
    })
    @Validate(MatchPassword, ["password"])
    confirmPassword: string;

    @ApiProperty({
        description: "Your personal address, between 3 and 80 characters.",
        example: "256 Road Street N"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @ApiProperty({
        description: "Phone number must not include spaces.",
        example: "2506983215"
    })
    @IsNotEmpty()
    @IsInt()
    phone: number;

    @ApiProperty({
        description: "Your current country, between 5 and 20 characters.",
        example: "Colombia"
    })
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    @ApiProperty({
        description: "Your current city, between 5 and 20 characters.",
        example: "Cucuta"
    })
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;
}
