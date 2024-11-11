import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { EventService } from './infrastructure/events/event.service';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event, context, callback) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

export const eventHandler: Handler = async (event) => {
  const appContext = await NestFactory.create(AppModule, { logger: false });
  const eventService = appContext.get(EventService);
  return eventService.process(event);
};
