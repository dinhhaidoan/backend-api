import { PrismaClient } from '@prisma/client';

export async function seedUsers(prisma: PrismaClient) {
  await prisma.user.upsert({
    where: { email: 'admin@system.com' },
    update: {},
    create: {
      email: 'admin@system.com',
      password: 'hashed-password', // TODO: Nhớ dùng bcrypt để hash password thực tế
      roles: {
        create: {
          role: { connect: { name: 'ADMIN' } },
        },
      },
    },
  });
}
