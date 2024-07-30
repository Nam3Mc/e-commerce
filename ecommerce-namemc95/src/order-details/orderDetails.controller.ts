import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailsService } from './orderDetails.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Order Details")
@Controller('orderdetails')
export class OrderDetailsController {
  constructor(private orderDetailsService: OrderDetailsService) {}

  @Get()
  getAllorderDetails() {
    return this.orderDetailsService.getOrderDetails();
  }
}
