import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, Put, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProdutsService } from './products.service';
import { ProductGuard } from 'src/guards/productCreator.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { RollsGuard } from 'src/guards/roles.guard';
import { Rolls } from 'src/decorators/rolls.decorator';
import { Roll } from 'src/enums/rolls.enum';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MaxFileSizeTypeValidator } from 'src/pipes/axFileSizeTypeValidator.pipe';
import { ProductUploadSchema } from 'src/schemas/productUpload.schema';

@ApiTags("Products")
@Controller('products')
export class ProdutsController {
  constructor(private readonly produtsService: ProdutsService) {}

  @Get()
  getAllgetProducts(@Query("page") page: number, @Query("limit") limit: number) {
    return this.produtsService.getAllgetProducts(page, limit);
  }
  
  @Get("seeder")
  seeAllProducts() {
    return this.produtsService.seeAllProducts()
  }
  
  @Get(":id")
  getProductById(@Param("id", ParseUUIDPipe) id: string ) {
    return this.produtsService.getProductById(id);
  }

  @ApiBearerAuth()
  @Rolls(Roll.Admin)
  @Post()
  @UseGuards( AuthGuard, RollsGuard)
  @ApiConsumes("multipart/form-data")
  @ApiBody(ProductUploadSchema)
  @UseInterceptors(FileInterceptor("file"))
  addProduct(
    @Body() newProductDto: any,
    @UploadedFile( new MaxFileSizeTypeValidator() ) productImage: Express.Multer.File
  ) {
    return this.produtsService.addProduct(newProductDto, productImage)
  }
 
  @ApiBearerAuth()
  @Rolls(Roll.Admin)
  @Put(":id")
  @UseGuards(AuthGuard, RollsGuard)
  @ApiConsumes("multipart/form-data")
  @ApiBody(ProductUploadSchema)
  @UseInterceptors(FileInterceptor("file"))
  updateProduct(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() productInfo: any,
    @UploadedFile(new MaxFileSizeTypeValidator) newImage: Express.Multer.File
  ) {
    return this.produtsService.updateProduct(id, productInfo, newImage)
  }

  @ApiBearerAuth()
  @Rolls(Roll.Admin)
  @Delete(":id")
  @UseGuards(AuthGuard, RollsGuard)
  deleteProduct(@Param("id", ParseUUIDPipe) id: string) {
    return this.produtsService.deleteProduct(id);
  }  

}
