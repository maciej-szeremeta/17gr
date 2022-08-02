import { ValidationPipe, } from '@nestjs/common';
import { NestFactory, } from '@nestjs/core';
import { AppModule, } from './app.module';
import { NestExpressApplication, } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  (app as NestExpressApplication).use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe({

    // disableErrorMessages: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  (app as NestExpressApplication).use(cookieParser());
  await app.listen(3001);
}
bootstrap();
