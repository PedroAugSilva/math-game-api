import { Socket } from "socket.io";
import { prisma } from "../../lib/prisma";

class DestroyMatchUseCase {
  async execute(socket: Socket, id: string) {
    const room = await prisma.match.delete({
      where: {
        id: id!,
      },
    });
    socket.leave(room.name);

    await prisma.participant.deleteMany({
      where: {
        participant_in_match: {
          every: {
            match_id: id,
          },
        },
      },
    });
  }
}
export default new DestroyMatchUseCase();
