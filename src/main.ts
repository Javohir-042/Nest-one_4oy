import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000, () => { console.log(`Server started at: http://localhost:${PORT}`)});
}
start();
