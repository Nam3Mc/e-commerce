import { Injectable } from '@nestjs/common';
import { OrderDetailRepository } from './oredersDetails.repository';

@Injectable()
export class OrderDetailsService {

  constructor(
    private orderDetailsRepository: OrderDetailRepository
  ){}

  

  getOrderDetails() {
    return this.orderDetailsRepository.orderDetails()
  }
  
}
