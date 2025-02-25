import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SetupSwagger = (path: string, app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('Documentation for NestJS API')
    .setVersion('1.0')
    .addTag('Main')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
