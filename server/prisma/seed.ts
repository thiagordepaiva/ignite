import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Thiago Paiva",
      email: "thiagordepaiva@gmail.com",
      avatarUrl: "https://github.com/thiagordepaiva.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Exemplo de Bolão",
      code: "8sd6e2",
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-02T18:00:00.609Z",
      firstTeamCountryCode: "DE",
      secundTeamCountryCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-03T22:00:00.609Z",
      firstTeamCountryCode: "BR",
      secundTeamCountryCode: "AR",
      guesses: {
        create: {
          firstTeamPoints: 3,
          secundTeamPoint: 1,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
