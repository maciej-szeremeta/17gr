import { Module, } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions, } from '@nestjs/typeorm';
import { config, } from 'ormconfig.autosync';
import { AppController, } from './app.controller';
import { AppService, } from './app.service';
import { UserModule, } from './user/user.module';
import { UserRoleModule, } from './user-role/user-role.module';

@Module({
  imports: [ TypeOrmModule.forRoot(config as TypeOrmModuleOptions), UserModule, UserRoleModule, ],
  controllers: [ AppController, ],
  providers: [ AppService, ],
})
export class AppModule {}
