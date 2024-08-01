import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailsService } from './orderDetails.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Order Details")
@Controller('orderdetails')
export class OrderDetailsController {
  constructor(private orderDetailsService: OrderDetailsService) {}

  @ApiBearerAuth()
  @Get(":id")
  getAllorderDetails(@Param("id") id: string ) {
    return this.orderDetailsService.getOrderDetails(id);
  }
}
