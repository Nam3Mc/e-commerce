import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put, ParseUUIDPipe } from '@nestjs/common';
import { ProdutsService } from './products.service';
import { NewProductDto } from './dto/newproduct.dto';
import { ProductGuard } from 'src/guards/productCreator.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Product } from './entities/product.entity';
import { RollsGuard } from 'src/guards/roles.guard';
import { Rolls } from 'src/decorators/rolls.decorator';
import { Roll } from 'src/enums/rolls.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('products')
export class ProdutsController {
  constructor(private readonly produtsService: ProdutsService) {}

  @Get()
  getAllgetProducts(@Query("page") page: number, @Query("limit") limit: number) {
    return this.produtsService.getAllgetProducts(page, limit);
  }

  @Get(":id")
  getProductById(@Param("id", ParseUUIDPipe) id: string ) {
    return this.produtsService.getProductById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards( AuthGuard, ProductGuard)
  addProduct(@Body() createProdutDto: NewProductDto) {
    return this.produtsService.addProduct(createProdutDto);
  }
 
  @ApiBearerAuth()
  @Put(":id")
  @Rolls(Roll.Admin)
  @UseGuards(ProductGuard, AuthGuard, RollsGuard)
  updateProduct(@Body() productInfo: Product) {
    return this.produtsService.updateProduct(productInfo)
  }

  @ApiBearerAuth()
  @Delete(":id")
  @UseGuards(ProductGuard, AuthGuard, RollsGuard)
  deleteProduct(@Param("id") id: string) {
    return this.produtsService.deleteProduct(id);
  }  

}
