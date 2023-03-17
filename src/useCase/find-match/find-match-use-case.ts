import { prisma } from "../../lib/prisma";

export class FindMatchUseCase {
  async execute(participant_id: string) {
    const amountMatchs = await prisma.match.findMany({
      include: {
        Participant_in_match: {
          select: {
            participant_id: true,
            match_id: true,
          },
        },
      },
    });

    const nameRoom = "room" + Math.random().toString(8).substr(2);

    if (amountMatchs.length === 0) {
      await prisma.match.create({
        data: {
          name: nameRoom,
          amout_participants: 1,
          Participant_in_match: {
            create: {
              participant_id: participant_id,
            },
          },
        },
      });
      return;
    }

    // will return matches with a player missing

    const emptyMatches = amountMatchs.filter(
      (match) => match.Participant_in_match.length === 1
    );

    if (emptyMatches.length >= 1) {
      const randomEmptyMatches =
        emptyMatches[Math.floor(Math.random() * emptyMatches.length)];

      await prisma.match.update({
        where: {
          id: randomEmptyMatches.id,
        },
        data: {
          name: randomEmptyMatches.name,
          amout_participants: 2,
          Participant_in_match: {
            create: [
              { participant_id },
              {
                participant_id:
                  randomEmptyMatches.Participant_in_match[0].participant_id,
              },
            ],
          },
        },
      });
    } else {
      await prisma.match.create({
        data: {
          name: nameRoom,
          amout_participants: 1,
          Participant_in_match: {
            create: {
              participant_id: participant_id,
            },
          },
        },
      });
    }
  }
}