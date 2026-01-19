import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Kích hoạt Validation (Để dùng được @IsString, @IsEmail trong DTO)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các field không khai báo trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu gửi lên field lạ
    }),
  );

  // 2. Kích hoạt Transform Interceptor (Chuẩn hóa response JSON)
  app.useGlobalInterceptors(new TransformInterceptor());

  // 3. Kích hoạt Exception Filter (Xử lý lỗi Prisma đẹp hơn)
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
