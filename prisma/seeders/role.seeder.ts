import { PrismaClient } from '@prisma/client';

export async function seedRoles(prisma: PrismaClient) {
  // Role ADMIN
  await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  // Role USER
  await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: { name: 'USER' },
  });

  console.log('✅ Roles seeded');
}
