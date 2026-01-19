import { PrismaClient } from '@prisma/client';

export async function seedUsers(prisma: PrismaClient) {
  await prisma.user.upsert({
    where: { email: 'admin@system.com' },
    update: {},
    create: {
      email: 'admin@system.com',
      password: 'hashed-password', // Lưu ý: Thực tế nên dùng bcrypt để hash ở đây
      roles: {
        create: {
          role: { connect: { name: 'ADMIN' } },
        },
      },
    },
  });

  console.log('✅ Users seeded');
}
