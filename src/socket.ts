import { FastifyInstance } from "fastify";
import destroyMatchUseCase from "./useCase/destroy-match/destroy-match-use-case";
import findMatchUseCase from "./useCase/find-match/find-match-use-case";

interface IData {
  username: string;
  room_id: string;
}
interface IPayload {
  username: string;
  avatar: string;
  socket_id: string;
  room_name: string;
}

export const socket = async (app: FastifyInstance) => {
  app.ready().then(() => {
    const { io } = app;
    io.on("connection", (socket) => {
      socket.on("find-room", async (payload: IPayload) => {
        const participats: IPayload[] = [];

        participats.push(payload);

        await findMatchUseCase.execute(payload, socket);
      });
    });
  });
};
