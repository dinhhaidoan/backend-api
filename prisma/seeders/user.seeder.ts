export async function seedUsers() {
  await prisma.user.upsert({
    where: { email: 'admin@system.com' },
    update: {},
    create: {
      email: 'admin@system.com',
      password: 'hashed-password',
      roles: {
        create: {
          role: { connect: { name: 'ADMIN' } },
        },
      },
    },
  });
}
