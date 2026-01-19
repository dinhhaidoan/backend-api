import { seedRoles } from './seeders/role.seeder';
import { seedUsers } from './seeders/user.seeder';

async function main() {
  await seedRoles();
  await seedUsers();
}

main();
