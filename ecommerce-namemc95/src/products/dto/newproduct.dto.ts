import { IsInt, IsString, IsUrl } from "class-validator"

export class NewProductDto {

    @IsString()
    name: string
    @IsString()
    description: string
    @IsInt()
    price: number
    @IsInt()
    stock: number
    @IsUrl()
    imgUrl: string
}
