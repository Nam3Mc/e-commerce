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
            throw new NotFoundException("Category not found")
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

    async addCategory(category: NewCategoryDto): Promise<void | boolean> {
        const {name} = category
        const exist: boolean = await this.validateCategory(name);
        if (exist) {
            console.log(exist)
        }
        else {
            const newCategory: NewCategoryDto = category
            this.categoriesDB.save(newCategory)
            console.log(exist)
        }
    }

}