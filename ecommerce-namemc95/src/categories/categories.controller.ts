import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { NewCategoryDto } from './dto/newCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService
    
  ) {}

  @Get()
  getCategories() {
    return this.categoriesService.getAll();
  }

  @Post()
  createCategory(@Body() category: NewCategoryDto) {
    return this.categoriesService.create(category);
  }
}
