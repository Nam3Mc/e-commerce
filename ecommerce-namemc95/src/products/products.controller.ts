import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { ProdutsService } from './products.service';
import { NewProductDto } from './dto/newproduct.dto';
import { ProductGuard } from 'src/guards/productCreator.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProdutsController {
  constructor(private readonly produtsService: ProdutsService) {}

  @Get()
  getAllgetProducts(@Query("page") page: number, @Query("limit") limit: number) {
    return this.produtsService.getAllgetProducts(page, limit);
  }

  @Get(":id")
  getProductById(@Param("id") id: string ) {
    return this.produtsService.getProductById(id);
  }

  @Post()
  @UseGuards( AuthGuard, ProductGuard)
  addProduct(@Body() createProdutDto: NewProductDto) {
    return this.produtsService.addProduct(createProdutDto);
  }
 
  @Put(":id")
  @UseGuards(ProductGuard)
  updateProduct(@Body() productInfo: Product) {
    return this.produtsService.updateProduct(productInfo)
  }

  @Delete(":id")
  deleteProduct(@Param("id") id: string) {
    return this.produtsService.deleteProduct(id);
  }  

}
