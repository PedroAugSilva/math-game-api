import { FastifyInstance } from "fastify";
import { FindMatchController } from "../useCase/find-match/find-match-controller";
import { DestroyMatchController } from "../useCase/destroy-match/destroy-match-controller";

export const matchRoutes = async (app: FastifyInstance) => {
  const findMatch = new FindMatchController();
  const destroyMatch = new DestroyMatchController();

  app.post("/find-match/:participant_id", findMatch.handle);
  app.delete("/match/:id", destroyMatch.handle);
};
