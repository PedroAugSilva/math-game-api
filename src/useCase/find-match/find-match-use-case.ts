import { prisma } from "../../lib/prisma";
import { Socket } from "socket.io";
import app from "../../http";
import { FastifyInstance } from "fastify";

interface IMatch {
  name: string;
  amount_participant: 2 | 1 | 0;
  participants: string[];
}
interface IPayload {
  username: string;
  avatar: string;
  socket_id: string;
  room_name: string;
}

class FindMatchUseCase {
  async execute(payload: IPayload, socket: Socket) {
    //

    const { io } = app;

    const alreadyExistUser = await prisma.participant.findFirst({
      where: {
        name: payload.username,
      },
    });

    if (alreadyExistUser) {
      socket.emit("already-exist-user-message", {
        message: "Jogador já existe",
        error: true,
      });
      return;
    }
    socket.emit("already-exist-user-message", {
      message: "Jogador criado",
      error: false,
    });

    const participant = await prisma.participant.create({
      data: {
        name: payload.username,
      },
    });

    const amountMatchs = await prisma.match.findMany({
      include: {
        participant_in_match: {
          select: {
            participant: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const nameRoom = "room" + Math.random().toString(8).substr(2);

    if (amountMatchs.length === 0) {
      const room = await prisma.match.create({
        data: {
          name: payload.room_name,
          amout_participants: 1,
          participant_in_match: {
            create: {
              participant_id: participant.id,
            },
          },
        },
      });
      socket.join(room.name);

      io.to(room.name).emit("loading-room", { situation: "loading" });
      return;
    }

    //  constant will return matches with a player missing
    const emptyMatches = amountMatchs.filter(
      (match) => match.participant_in_match.length === 1
    );

    //join in game

    if (emptyMatches.length >= 1) {
      await prisma.match.update({
        where: {
          id: emptyMatches[0].id,
        },
        data: {
          name: emptyMatches[0].name,
          amout_participants: 2,
          participant_in_match: {
            create: {
              participant_id: participant.id,
            },
          },
        },
      });

      const room = await prisma.match.findFirst({
        where: {
          id: emptyMatches[0].id,
        },
        include: {
          participant_in_match: {
            select: {
              participant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      //returning infos for room from participants
      socket.join(room!.name);

      // payload.socket_id
      // payload.room_name

      const participantInRoom = await prisma.participant.findMany({
        include: {
          participant_in_match: {
            include: {
              match: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      io.to(room!.name).emit("loading-room", room);
      return;
    } else {
      //create game
      const room = await prisma.match.create({
        data: {
          name: nameRoom,
          amout_participants: 1,
          participant_in_match: {
            create: {
              participant_id: participant.id,
            },
          },
        },
      });
      socket.join(room.name);
      io.to(room.name).emit("loading-room", { situation: "loading" });
      return;
    }
  }
}
export default new FindMatchUseCase();
