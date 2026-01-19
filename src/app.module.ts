// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { I18nJsonLoader } from 'nestjs-i18n/dist/loaders/i18n.json.loader';
import path from 'path/win32';
import * as Joi from 'joi';
// ... các import khác

@Module({
  imports: [
    // 👇 SỬA ĐOẠN NÀY: Thêm isGlobal: true
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
      isGlobal: true, // 👈 CHÌA KHÓA VÀNG: Giúp ConfigService dùng được ở mọi nơi
      load: [databaseConfig],
      envFilePath: '.env', // (Tùy chọn) load file .env
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
