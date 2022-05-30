import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  
  const config = new DocumentBuilder()
  .setTitle('Food API Documentation')
  .setDescription('A simple BackEnd about food page')
  .setVersion('1.0')
  .addTag('products')
  .build();
  app.useGlobalPipes(new ValidationPipe({whitelist:true, forbidNonWhitelisted:true}));
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('documentation', app, document);





  await app.listen(3000);
}
bootstrap();
