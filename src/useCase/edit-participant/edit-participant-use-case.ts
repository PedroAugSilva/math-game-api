import { prisma } from "../../lib/prisma";

interface IParticipant {
    id: string,
    name: string
}

export class EditParticipantUseCase {
    async execute({ name, id }: IParticipant) {
        const alreadyExistUser = await prisma.participant.findFirst({
            where: {
                name
            }
        })

        if (alreadyExistUser) {
            throw new Error("User exist")
        }

        await prisma.participant.update({
            where: {
                id
            },
            data: {
                name
            }
        })
    }
}