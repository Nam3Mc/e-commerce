import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { NewCategoryDto } from './dto/newCategory.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor (
    private categoriesRepository: CategoriesRepository
  ) {}

  getAll(): Promise<Category[]> {
    return this.categoriesRepository.categories();
    
  }

  create(category: NewCategoryDto): Promise<string> {
    return this.categoriesRepository.addCategory(category)
  }
}
