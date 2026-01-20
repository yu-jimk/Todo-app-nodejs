import { PrismaClient } from '../src/generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.todo.createMany({
    data: [
      { title: 'Learn NestJS', completed: false },
      { title: 'Build a REST API', completed: false },
      { title: 'Write unit tests', completed: false },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
