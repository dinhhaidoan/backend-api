// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());

  // Cần HttpAdapterHost để kế thừa BaseExceptionFilter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setDescription('API documentation for Backend Project')
    .setVersion('1.0')
    .addBearerAuth() // Cho phép nhập Token để test các API bảo mật
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Truy cập tại: http://localhost:3000/api/docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
