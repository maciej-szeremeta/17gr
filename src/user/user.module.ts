import { Module, forwardRef, } from '@nestjs/common';
import { UserRoleModule, } from '../user-role/user-role.module';
import { UserController, } from './user.controller';
import { UserService, } from './user.service';

@Module({
  imports:[ forwardRef(() =>  
    UserRoleModule), ],
  controllers: [ UserController, ],
  providers: [ UserService, ],
})
export class UserModule {}
