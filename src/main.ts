import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const options = new DocumentBuilder()
    .setTitle('일이삼홈 API 문서')
    .setDescription('일이삼홈 API 문서')
    .setVersion('1.0')
    .addServer('http://localhost:5000/', 'Local')
    .addTag('swagger')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.PORT || 5000;

  await app.listen(PORT);
}
bootstrap();
