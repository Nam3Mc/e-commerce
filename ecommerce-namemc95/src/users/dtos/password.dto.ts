import { ApiProperty } from "@nestjs/swagger"
import { IsString, Matches, Validate } from "class-validator"
import { MatchPassword } from "src/decorators/matchPassword.decorator"

export class PasswordDto{

    @ApiProperty({
        description: "The old password is needed to confirm teh request is correct",
        example: "my*Passw0rd"
    })
    @IsString()
    password: string

    @ApiProperty({
        description: "new password needs to match the strong password requirements",
        example: "Passw0rd!"
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/)
    @IsString()
    newPassword: string

    @ApiProperty({
        description: "New password needs to be confirmed",
        example: "Passw0rd!"
    })
    @IsString()
    @Validate(MatchPassword,["newPassword"])
    newPaswordConfirmation: string

}