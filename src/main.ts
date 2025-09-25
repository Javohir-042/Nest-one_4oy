import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"]
  });

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT ?? 3000, () => { console.log(`Server started at: http://localhost:${PORT}`)});
}
start();
