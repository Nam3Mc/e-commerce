import { Injectable } from "@nestjs/common";
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

    async validateCategory(categoryName: string): Promise<boolean> {
        const category = await this.categoriesDB.findOne({
            where: {name: categoryName}
        })
        if (!category) return false
        return true
    }

    async addCategory(category: NewCategoryDto): Promise<void> {
        const {name} = category
        const exist: boolean = await this.validateCategory(name);
        if (exist) {
            throw new Error ("This category does exist")
        }
        else {
            const newCategory: NewCategoryDto = category
            this.categoriesDB.save(newCategory)
        }
    }
}