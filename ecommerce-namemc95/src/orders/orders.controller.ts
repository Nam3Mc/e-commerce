import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { NewOrderDto } from './dto/newOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.getAll();
  }  
  
  @Post()
  create(@Body() userOrder: NewOrderDto) {
    return this.ordersService.addOrder(userOrder);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
    // return this.ordersService.findOne(+id);
  // }
}
