import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class NewCategoryDto {

    @ApiProperty({
        description: "Category name must be an string not longer than 50 characters",
        example: "Desktop"
    })
    @IsString()
    @MaxLength(50)
    name: string
}
