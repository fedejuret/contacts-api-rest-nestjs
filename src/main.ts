import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HandlerFilter } from './handler.filter';
import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HandlerFilter());

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
