import fastify from "fastify";
import fastifyIo from "fastify-socket.io";
import cors from "@fastify/cors";
import { participantRoutes } from "./routes/participant.routes";
import { matchRoutes } from "./routes/match.routes";
import { prisma } from "./lib/prisma";
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

// app.get("/aa", () => {
//   return {
//     message: "bem vindo",
//   };
// });

// app.ready().then(() => {
//   const { io } = app;
//   io.on("connection", (socket) => {
//     io.emit("andar", {
//       y: 10,
//       x: 10,
//     });
//   });
// });

app.get("/", async () => {
  return await prisma.participant.findMany();
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

app
  .listen({
    port: 3000,
  })
  .then(() => console.log("servidor aberto!!"));
