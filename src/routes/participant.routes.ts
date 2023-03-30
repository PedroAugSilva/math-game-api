import { FastifyInstance } from "fastify";

import { CreateParticipantController } from "../useCase/create-participant/create-participant-controller";

export const participantRoutes = async (app: FastifyInstance) => {
  const createPrticipant = new CreateParticipantController();

  app.post("/participant", createPrticipant.handle);
};
