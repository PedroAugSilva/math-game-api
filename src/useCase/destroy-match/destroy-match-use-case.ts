import { prisma } from "../../lib/prisma";

export class DestroyMatchUseCase {
  async execute(id: string) {
    await prisma.match.delete({
      where: {
        id,
      },
    });
  }
}
