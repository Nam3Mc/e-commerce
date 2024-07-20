import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { UserModules } from 'src/users/users.modules';

@Module({
  imports: [UserModules],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
