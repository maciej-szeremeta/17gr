import { Module, forwardRef, } from '@nestjs/common';
import { StudentUrlModule, } from '../student-url/student-url.module';
import { HrModule, } from '../hr/hr.module';
import { MailModule, } from '../mail/mail.module';
import { UserController, } from './user.controller';
import { UserService, } from './user.service';

@Module({
  imports: [
    forwardRef(() =>  
      MailModule),
    forwardRef(() =>  
      HrModule),
    forwardRef(() =>  
      StudentUrlModule), ],
  controllers: [ UserController, ],
  providers: [ UserService, ],
})
export class UserModule {}
