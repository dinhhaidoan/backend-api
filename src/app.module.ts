// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import databaseConfig from './config/database.config';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { I18nJsonLoader } from 'nestjs-i18n/dist/loaders/i18n.json.loader';
import path from 'path/win32';
// ... các import khác

@Module({
  imports: [
    // 👇 SỬA ĐOẠN NÀY: Thêm isGlobal: true
    ConfigModule.forRoot({
      isGlobal: true, // 👈 CHÌA KHÓA VÀNG: Giúp ConfigService dùng được ở mọi nơi
      load: [databaseConfig],
      envFilePath: '.env', // (Tùy chọn) load file .env
    }),
    UsersModule,
    AuthModule,
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
