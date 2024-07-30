import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dtos/user.dto';
import { AuthDto } from './dtos/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signUp(@Body() userDto: UserDto) {
    return this.authService.signUp(userDto);
  }

  @Post("signIn")
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto)
  }
}
