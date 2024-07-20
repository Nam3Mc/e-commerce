import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { NewOrderDto } from './dto/newOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.getAll()
  }

  @Get(":id")
  getOneOrder(@Param("id") id: string ) {
    return this.ordersService.getOrderDetails(id);
  }  
  
  @Post()
  create(@Body() userOrder: NewOrderDto) {
    return this.ordersService.addOrder(userOrder);
  }
}
