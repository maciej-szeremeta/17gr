import { Module, } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions, } from '@nestjs/typeorm';
import { config, } from 'ormconfig.autosync';
import { AppController, } from './app.controller';
import { AppService, } from './app.service';
import { UserModule, } from './user/user.module';
import { UserRoleModule, } from './user-role/user-role.module';
import { AuthModule, } from './auth/auth.module';
import { MailModule, } from './mail/mail.module';
import { HrModule } from './hr/hr.module';
import { StudentModule } from './student/student.module';
import { StudentUrlModule } from './student-url/student-url.module';

@Module({
  imports: [ TypeOrmModule.forRoot(config as TypeOrmModuleOptions), UserModule, UserRoleModule, AuthModule, MailModule, HrModule, StudentModule, StudentUrlModule, ],
  controllers: [ AppController, ],
  providers: [ AppService, ],
})
export class AppModule {}
