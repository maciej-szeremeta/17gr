import { Module, } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions, } from '@nestjs/typeorm';
import { config, } from 'ormconfig.autosync';
import { AppController, } from './app.controller';
import { AppService, } from './app.service';

@Module({
  imports: [ TypeOrmModule.forRoot(config as TypeOrmModuleOptions), ],
  controllers: [ AppController, ],
  providers: [ AppService, ],
})
export class AppModule {}
