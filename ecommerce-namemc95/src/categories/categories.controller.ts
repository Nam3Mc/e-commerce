import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { NewCategoryDto } from './dto/newCategory.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags("Categories")
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService
    
  ) {}

  @Get()
  getCategories() {
    return this.categoriesService.getAll();
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  createCategory(@Body() category: NewCategoryDto) {
    return this.categoriesService.create(category);
  }
}
