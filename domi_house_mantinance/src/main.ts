import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Configuración de Swagger
    const config = new DocumentBuilder()
    .setTitle('House Management API')
    .setDescription('API para gestionar casas y habitaciones')
    .setVersion('1.0')
    .addTag('houses') // Puedes añadir más tags para diferentes módulos
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Ruta de Swagger: /api


  await app.listen(3000);
  console.log('Microservicio HTTP corriendo en http://localhost:3000');
}
bootstrap();