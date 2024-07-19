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
    return this.orderRepositiry.getOrder()
  }

  // findOne(id: number) {
    // return `This action returns a #${id} order`;
  // }
}
