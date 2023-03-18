import { prisma } from "../../lib/prisma";

interface IParticipant {
  id: string;
  name: string;
}

export class EditParticipantUseCase {
  async execute({ name, id }: IParticipant) {
    await prisma.participant.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }
}
