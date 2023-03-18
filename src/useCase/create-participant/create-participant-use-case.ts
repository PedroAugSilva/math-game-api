import { prisma } from "../../lib/prisma";

export class CreateParticipantUseCase {
    async execute(name: string) {
        const alreadyExistUser = await prisma.participant.findFirst({
            where: {
                name
            }
        })

        if(alreadyExistUser){
            throw new Error("User exist")
        }

        await prisma.participant.create({
            data: {
                name
            }
        })
    }
}