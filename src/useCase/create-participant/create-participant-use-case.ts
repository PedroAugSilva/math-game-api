import { prisma } from "../../lib/prisma";

export class CreateParticipantUseCase {
  async execute(name: string) {
    await prisma.participant.create({
      data: {
        name,
      },
    });
  }
}
