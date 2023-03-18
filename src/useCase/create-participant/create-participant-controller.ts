import { FastifyRequest } from "fastify";
import z from 'zod'
import { CreateParticipantUseCase } from "./create-participant-use-case";

export class CreateParticipantController {
    async handle(req: FastifyRequest) {
        const participantBody = z.object({
            name: z.string()
        })
        const { name } = participantBody.parse(req.body)

        const createParticipant = new CreateParticipantUseCase()

        createParticipant.execute(name)
    }
}