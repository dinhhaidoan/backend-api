import { PrismaClient } from '@prisma/client';
import { seedRoles } from './seeders/role.seeder';
import { seedUsers } from './seeders/user.seeder';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // Truyền instance prisma vào các hàm con
  await seedRoles(prisma);
  await seedUsers(prisma);

  console.log('🌳 Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
