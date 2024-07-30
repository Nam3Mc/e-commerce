import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { PartialProductDto } from "src/products/dto/partialProdut.dto"

export class NewOrderDto {

    @ApiProperty({
        description: "User id whom the order will be owned by needs to be send in the request body",
        example: "'user_id':'f5e5645b-f2d1-4cad-b81f-f4a6332d849f'"
    })
    @IsNotEmpty()
    @IsUUID()
    user_id: string

    @ApiProperty({
        description: "To create an order the body request will contain an array of ids for each product",
        example: " 'orderDetails_':[{id: '0c15147e-55bf-4273-9b22-2bdb3dbe6cd1'}, {id: 'a283dd09-7203-444b-b37f-51a1e0ee14fe'},{id: '5098c5b6-c33e-46bd-be59-dc5a97507ca1'}]"
    })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => PartialProductDto)
    orderDetails_: [{id: string}]
}
