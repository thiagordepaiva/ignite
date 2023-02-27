import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import ShortUniqueid from "short-unique-id";

const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count: count };
  });

  fastify.post("/pools", async (request, reply) => {
    const createPoolBody = z.object({
      title: z
        .string()
        .trim()
        .min(3, "O título deve conter no minimo 3 caractes"),
    });

    const { title } = createPoolBody.parse(request.body);
    const generate = new ShortUniqueid({ length: 6 });
    const code = String(generate()).toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code,
      },
    });

    return reply.status(201).send({ code });
  });

  fastify.get("/users/count", async () => {
    const count = await prisma.user.count();

    return { count: count };
  });

  fastify.get("/guesses/count", async () => {
    const count = await prisma.guess.count();

    return { count: count };
  });

  await fastify.listen({ port: 3333 });
}

bootstrap();
