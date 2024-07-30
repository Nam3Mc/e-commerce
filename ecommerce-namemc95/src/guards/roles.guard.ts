import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roll } from 'src/enums/rolls.enum';

@Injectable()
export class RollsGuard implements CanActivate {

  constructor( 
    private readonly reflector: Reflector
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRolls = this.reflector.getAllAndOverride<Roll[]>("rolls", [
      context.getHandler(), 
      context.getClass()])

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRolll = () => requiredRolls.some( (roll) => user?.roll?.includes(roll));
    const valid = user && user.roll && hasRolll();
    if (!valid) {
      throw new ForbiddenException("You do not have permission to access this route")
    } else return true;
  }
}
