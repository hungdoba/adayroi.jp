import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = (() => {
  let prisma: PrismaClient | null = null;

  return () => {
    if (!prisma) {
      prisma = new PrismaClient({
        log: ['info', 'warn', 'error'],
      });
    }
    return prisma;
  };
})();

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

const prisma = global.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = prisma;
}

export default prisma;
