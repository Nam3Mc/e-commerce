import { Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { NewCategoryDto } from "./dto/newCategory.dto";

@Injectable()
export class CategoriesRepository {

    constructor(
        @InjectRepository(Category) 
        private categoriesDB: Repository<Category>
    ) {}

    async categories(): Promise<Category[]> {
        const categories: Category [] = await this.categoriesDB.find();
        return categories;
    }
    
    async getCategoryByName(categoryName: string): Promise<Category> {
        const exist = await this.validateCategory(categoryName)
        if (!exist) {
            const newCategoryDto = new NewCategoryDto
            newCategoryDto.name = categoryName
            const createdCategory = await this.categoriesDB.save(newCategoryDto)
            return createdCategory;
        }
        else {
            const category = await this.categoriesDB.findOne({
                where: {name: categoryName}
            })
            return category
        }
    }

    async validateCategory(categoryName: string): Promise<boolean> {
        const category = await this.categoriesDB.findOne({
            where: {name: categoryName}
        })
        if (!category) return false
        return true
    }

    async addCategory(category: NewCategoryDto): Promise<string> {
        const {name} = category
        const exist: boolean = await this.validateCategory(name);
        if (exist) {
            const id = (await this.getCategoryByName(name)).id
            return `This product already exist with ID ${id}`
        }
        else {
            return (await this.categoriesDB.save(category)).id
        }
    }

}