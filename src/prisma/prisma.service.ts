// src/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private configService: ConfigService) {
    // 1. Tạo Connection Pool (Quản lý kết nối DB thủ công)
    const pool = new Pool({
      connectionString: configService.get<string>('DATABASE_URL'),
      max: 20, // Giới hạn số kết nối
    });

    // 2. Gắn Adapter (Cầu nối giữa Pool và Prisma)
    const adapter = new PrismaPg(pool);

    // 3. Khởi tạo PrismaClient với Adapter
    super({ adapter });
  }

  async onModuleInit() {
    // Bắt buộc gọi connect để khởi động Pool
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
