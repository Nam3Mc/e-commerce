import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"


export class AddressDto {

    @ApiProperty({
        description: "Like password and personal information, address can be change separatly",
        example: "Av 12 Spririt S"
    })
    @IsString()
    address: string

    @ApiProperty({
        description: " contry can remain the same if is not needed to be modified",
        example: "Colombia"
    })
    @IsString()
    country: string

    @ApiProperty({
        description: "City is available to receive changes",
        example: "Triton"
    })
    @IsString()
    city: string
}