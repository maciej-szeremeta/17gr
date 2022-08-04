import { Module, forwardRef, } from '@nestjs/common';
import { HrModule, } from '../hr/hr.module';
import { MailModule, } from '../mail/mail.module';
import { UserController, } from './user.controller';
import { UserService, } from './user.service';

@Module({
  imports: [
    forwardRef(() =>  
      MailModule),
    forwardRef(() =>  
      HrModule), ],
  controllers: [ UserController, ],
  providers: [ UserService, ],
})
export class UserModule {}
