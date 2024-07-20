import { Type } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { PartialProductDto } from "src/products/dto/partialProdut.dto"

export class NewOrderDto {

    @IsNotEmpty()
    @IsUUID()
    user_id: string

    @IsArray()
    @ArrayNotEmpty()
    // ValidateNested IS USER TO DECLARE IF ANY ANIDATED ELEMENT IS ADDED 
    // TO VERIFY EACH OF THEM IT MEANS EACH ELEMENT INSIDE ANY ARRAY
    @ValidateNested({each: true})
    // @Type RECEIVED A DTO WHICH CLASS IS THE ONE ITEMS INSIDE ARRAY NEED TO MACHT  
    // INSIDE PartialProductDto IS THE CLASS TO MATCH 
    @Type(() => PartialProductDto)
    orderDetails_: [{id: string}]
}
