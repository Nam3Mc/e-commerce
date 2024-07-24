import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
  exports: [AuthRepository]
})
export class AuthModule {}
