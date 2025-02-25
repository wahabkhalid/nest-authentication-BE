import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './config/env';
import { SetupSwagger } from './config/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  if (ENV.ENABLE_SWAGGER) {
    SetupSwagger('swagger', app);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // Throw an error for unknown fields
      transform: true, // Transform payloads to match DTO types
      disableErrorMessages: false, // Ensure error messages are not suppressed
    }),
  );
  app.enableCors();
  app.use('api/docs', bodyParser.raw({ type: 'application/json' }));
  await app.listen(ENV.BE_PORT);
}

bootstrap().then();
