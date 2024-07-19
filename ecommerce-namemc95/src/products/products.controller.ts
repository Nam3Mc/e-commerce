import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutsService } from './products.service';
import { NewProductDto } from './dto/newproduct.dto';

@Controller('products')
export class ProdutsController {
  constructor(private readonly produtsService: ProdutsService) {}

  @Get()
  allProducts(@Body() page: number, limit: number) {
    return this.produtsService.getAll(page, limit);
  }

  @Post()
  create(@Body() createProdutDto: NewProductDto) {
    return this.produtsService.newPoduct(createProdutDto);
  }

}
