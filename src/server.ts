import fastify from "fastify";
import fastifyIo from "fastify-socket.io";
import cors from "@fastify/cors";
const app = fastify();

app.register(cors);

app.register(fastifyIo, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

app.get("/aa", () => {
  return {
    message: "bem vindp",
  };
});

app.ready().then(() => {
  const { io } = app;
  io.on("connection", (socket) => {
    io.emit("andar", {
      y: 10,
      x: 10,
    });
  });
});

app
  .listen({
    port: 3000,
  })
  .then(() => console.log("servidor aberto!!"));
