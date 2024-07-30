import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { NewOrderDto } from './dto/newOrder.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Orders")
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.getAll()
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  getOneOrder(@Param("id") id: string ) {
    return this.ordersService.getOrderDetails(id);
  }  
  
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() userOrder: NewOrderDto) {
    return this.ordersService.addOrder(userOrder);
  }
}
