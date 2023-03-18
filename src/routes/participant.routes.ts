import { FastifyInstance } from "fastify";
import { EditParticipantController } from "../useCase/edit-participant/edit-participant-controller";
import { CreateParticipantController } from "../useCase/create-participant/create-participant-controller";

export const participantRoutes = async (app: FastifyInstance) => {
  const editParticipant = new EditParticipantController();
  const createPrticipant = new CreateParticipantController();
  app.patch("/participant/:id", editParticipant.handle);
  app.post("/participant", createPrticipant.handle);
};
