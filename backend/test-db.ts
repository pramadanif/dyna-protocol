import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const events = await prisma.stakeEvent.findMany();
  console.log("EVENTS:", events);
  const stats = await prisma.protocolStats.findMany();
  console.log("STATS:", stats);
}
main().catch(console.error).finally(() => prisma.$disconnect());
