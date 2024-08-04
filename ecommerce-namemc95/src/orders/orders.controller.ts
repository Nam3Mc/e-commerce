import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { NewOrderDto } from './dto/newOrder.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Rolls } from 'src/decorators/rolls.decorator';
import { Roll } from 'src/enums/rolls.enum';
import { RollsGuard } from 'src/guards/roles.guard';

@ApiTags("Orders")
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Get()
  @Rolls(Roll.Admin)
  @UseGuards(AuthGuard, RollsGuard)
  getOrders() {
    return this.ordersService.getAll()
  }

  @ApiBearerAuth()
  @Get("user/:id")
  @UseGuards(AuthGuard)
  geUserOrders(@Param("id") id: string) {
    return this.ordersService.getUserOrders(id);
  }

  @ApiBearerAuth()
  @Get(":id")
  @UseGuards(AuthGuard)
  getOneOrder(@Param("id") id: string ) {
    return this.ordersService.getOrderDetails(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() userOrder: NewOrderDto) {
    return this.ordersService.addOrder(userOrder);
  }
}
