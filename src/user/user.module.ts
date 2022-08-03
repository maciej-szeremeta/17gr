import { Module, forwardRef, } from '@nestjs/common';
import { MailModule, } from '../mail/mail.module';
import { UserController, } from './user.controller';
import { UserService, } from './user.service';

@Module({
  imports:[ forwardRef(() =>  
    MailModule), ],
  controllers: [ UserController, ],
  providers: [ UserService, ],
})
export class UserModule {}
