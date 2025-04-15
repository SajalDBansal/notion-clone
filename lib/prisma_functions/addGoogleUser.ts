import { PrismaClient } from "../generated/prisma";
import { AddGoogleUserProps } from "../schema_types";

export async function addGoogleUser(sessionData: AddGoogleUserProps) {
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
        data: {
            id: sessionData.sub,
            name: sessionData.name,
            email: sessionData.email,
            password: sessionData.name,
            imageUrl: sessionData.picture,
            UserLogs: {
                create: {
                    type: "New user crearted",
                }
            }
        }
    })
    return user;
}

