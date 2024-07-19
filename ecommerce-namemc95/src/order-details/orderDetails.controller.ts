import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailsService } from './orderDetails.service';

@Controller('orderdetails')
export class OrderDetailsController {
  constructor(private orderDetailsService: OrderDetailsService) {}

  @Get()
  getAllorderDetails() {
    return this.orderDetailsService.getOrderDetails();
  }
}
