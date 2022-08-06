import { Module, forwardRef, } from '@nestjs/common';
import { HrModule, } from '../hr/hr.module';
import { MailModule, } from '../mail/mail.module';
import { UserController, } from './user.controller';
import { UserService, } from './user.service';
import { StudentModule, } from '../student/student.module';

@Module({
  imports: [
    forwardRef(() =>  
      MailModule),
    forwardRef(() =>  
      HrModule),
    forwardRef(() =>  
      StudentModule), ],
  controllers: [ UserController, ],
  providers: [ UserService, ],
})
export class UserModule {}
