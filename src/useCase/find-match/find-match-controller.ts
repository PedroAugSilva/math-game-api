import { FastifyRequest } from "fastify";
import FindMatchUseCase from "./find-match-use-case";
import z from "zod";

export class FindMatchController {
  async handle(req: FastifyRequest) {
    const matchParams = z.object({
      participant_id: z.string(),
    });

    const { participant_id } = matchParams.parse(req.params);

    // const findMatch = new FindMatchUseCase();

    // return await findMatch.execute(participant_id);
  }
}
