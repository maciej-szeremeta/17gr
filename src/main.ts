import { ValidationPipe, } from '@nestjs/common';
import { NestFactory, } from '@nestjs/core';
import { AppModule, } from './app.module';
import { NestExpressApplication, } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config, } from './app.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: config.configCors.credentials,
    origin: config.configCors.credentials,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({

    // disableErrorMessages: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion:true,
    },
  }));
  (app as NestExpressApplication).use(morgan('dev'));
  (app as NestExpressApplication).use( (rateLimit ({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max     : 100, // Limit each IP to 100 requests per `window`  (here, per 15 minutes)
  })));
  (app as NestExpressApplication).use(cookieParser());
  await app.listen(3001);
}
bootstrap();
