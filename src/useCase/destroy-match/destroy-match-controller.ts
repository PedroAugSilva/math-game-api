import { FastifyRequest } from "fastify";
import z from "zod";
// import { DestroyMatchUseCase } from "./destroy-match-use-case";

export class DestroyMatchController {
  async handle(req: FastifyRequest) {
    const matchParams = z.object({
      id: z.string(),
    });
    const { id } = matchParams.parse(req.params);

    // const destroyMatch = new DestroyMatchUseCase();

    // await destroyMatch.execute(id);
  }
}
