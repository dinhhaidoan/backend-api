import { PrismaClient } from '@prisma/client';

export async function seedRoles(prisma: PrismaClient) {
  // Xóa dòng import prisma cũ nếu có, sử dụng biến prisma được truyền vào
  await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: { name: 'USER' },
  });
}
