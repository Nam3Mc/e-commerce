import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, 
    next: CallHandler
  ): Observable<any>  {

    return next.handle().pipe(
      map( (users: User []) => {
        for (const user of users) {
          user.password = "*".repeat(user.password.length)
        }
        return users
      })
    )
  }
}
