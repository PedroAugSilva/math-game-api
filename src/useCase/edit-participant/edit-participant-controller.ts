import { EditParticipantUseCase } from "./edit-participant-use-case";
import { FastifyRequest } from "fastify";
import z from "zod";

export class EditParticipantController {
  async handle(req: FastifyRequest) {
    const participantBody = z.object({
      name: z.string(),
    });
    const participantParams = z.object({
      id: z.string(),
    });

    const { name } = participantBody.parse(req.body);
    const { id } = participantParams.parse(req.params);

    const editParticipant = new EditParticipantUseCase();

    editParticipant.execute({ name, id });
  }
}
