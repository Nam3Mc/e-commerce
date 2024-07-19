import { Module } from '@nestjs/common';
import { OrderDetailsService } from './orderDetails.service';
import { OrderDetailsController } from './orderDetails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderDetailRepository } from './oredersDetails.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail])
  ],
  providers: [OrderDetailsService, OrderDetailRepository],
  controllers: [OrderDetailsController],
  exports: [OrderDetailRepository]
})
export class OrderDetailsModule {}
