import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://frontend:5173', 'http://localhost:5173'],
    credentials: true,
  });
  await app.listen(8000, '0.0.0.0');
}
bootstrap();
