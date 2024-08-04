import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserModules } from 'src/users/users.modules';
import { ProductsModule } from 'src/products/products.module';
import { OrderDetailsModule } from 'src/order-details/orderDetails.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UserModules,
    ProductsModule,
    OrderDetailsModule,
  ],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
  exports: [ OrdersRepository ]
})
export class OrdersModule {}
