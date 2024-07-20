import { IsString } from "class-validator";

export class NewCategoryDto {

    @IsString()
    name: string
}
