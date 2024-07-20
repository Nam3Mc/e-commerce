import { IsString } from "class-validator"


export class AddressDto {

    @IsString()
    id: string
    @IsString()
    address: string
    @IsString()
    country: string
    @IsString()
    city: string
}