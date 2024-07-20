import { Injectable } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {

  constructor( private readonly authRepository: AuthRepository
  ) {}

  singIn(auth: AuthDto) {
    return this.authRepository.authValidator(auth)
  }
}
