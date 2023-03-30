import fastify from "fastify";
import fastifyIo from "fastify-socket.io";
import cors from "@fastify/cors";
import { participantRoutes } from "./routes/participant.routes";
import { matchRoutes } from "./routes/match.routes";
import { prisma } from "./lib/prisma";

import { socket } from "./socket";

const app = fastify();

app.register(cors);

app.register(fastifyIo, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

app.register(participantRoutes);
app.register(matchRoutes);

app.register(socket);

app.get("/", async () => {
  return await prisma.participant.findMany();
});

app.get("/relations", async () => {
  return await prisma.participantInMatch.findMany();
});

app.get("/matches", async () => {
  return await prisma.match.findMany({
    include: {
      participant_in_match: {
        select: {
          participant_id: true,
          match_id: true,
        },
      },
    },
  });
});

app.delete("/delete", async () => {
  await prisma.match.deleteMany();
});
app.delete("/delete/part", async () => {
  await prisma.participant.deleteMany();
});

export default app;
