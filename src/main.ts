import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"],
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nest-One Project')
    .setDescription('The Nest-one API description')
    .setVersion('1.0')
    .addTag('Nest, bacrypt, jwt, guard, swagger, validation')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);



  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
    console.log(`Swagger document: http://localhost:${PORT}/api/docs`);
  });
}
start();
