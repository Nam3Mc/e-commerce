import { IsInt, IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NewProductDto {

    @ApiProperty({
        description: "The name of the product, must be a string",
        example: "Laptop"
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: "The description of the product, must be a string",
        example: "A high-performance laptop suitable for all your computing needs"
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: "The price of the product",
        example: 99.50
    })
    @IsInt()
    price: number;

    @ApiProperty({
        description: "The stock quantity of the product, must be an integer",
        example: 50
    })
    @IsInt()
    stock: number;

    @ApiProperty({
        description: "The URL of the product image, must be a valid URL",
        example: "https://example.com/laptop.jpg"
    })
    @IsUrl()
    imgUrl: string;
}
