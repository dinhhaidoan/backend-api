import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; // Import adapter
import { Pool } from 'pg'; // Import pool
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

// 1. Load biến môi trường (vì chạy script rời, không qua NestJS Config)
dotenv.config();

// 2. Setup connection giống hệt PrismaService
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  max: 1, // Script seed chỉ cần 1 connection là đủ
});

const adapter = new PrismaPg(pool);

// 3. Khởi tạo Prisma với Adapter (Hết lỗi "datasources does not exist")
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Start seeding...');

  // Hash password
  const passwordHash = await bcrypt.hash('123456', 10);

  // Tạo Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@system.com' },
    update: {},
    create: {
      email: 'admin@system.com',
      password: passwordHash,
      fullName: 'Super Admin',
      role: Role.ADMIN,
    },
  });
  console.log(`👤 Created Admin: ${admin.email}`);

  // Tạo Staff
  const staff = await prisma.user.upsert({
    where: { email: 'staff@system.com' },
    update: {},
    create: {
      email: 'staff@system.com',
      password: passwordHash,
      fullName: 'Nhân viên A',
      role: Role.STAFF,
    },
  });
  console.log(`👤 Created Staff: ${staff.email}`);

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Ngắt kết nối Pool chuẩn chỉnh
    await prisma.$disconnect();
    await pool.end();
  });
