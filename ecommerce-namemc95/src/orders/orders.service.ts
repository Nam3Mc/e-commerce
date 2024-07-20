import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { NewOrderDto } from './dto/newOrder.dto';

@Injectable()
export class OrdersService {

  constructor(
    private orderRepositiry: OrdersRepository
  ) {}

  addOrder(userOrder: NewOrderDto) {
    return this.orderRepositiry.addOrder(userOrder)
  }

  getAll() {
    return this.orderRepositiry.orders();
  }

  getOrderDetails(id: string) {
    // console.log(id)
    return this.orderRepositiry.getOrderById(id)
  }
}
