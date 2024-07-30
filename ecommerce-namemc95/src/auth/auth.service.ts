import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { UserDto } from 'src/users/dtos/user.dto';
import { AuthDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {

  constructor( private readonly authRepository: AuthRepository
  ) {}

  signUp(userDto: UserDto) {
    return this.authRepository.signUp(userDto)
  }

  signIn(authDto: AuthDto) {
    return this.authRepository.signIn(authDto)
  }
}
