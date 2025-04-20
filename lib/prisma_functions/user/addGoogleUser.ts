import { AddGoogleUserProps } from "@/lib/schema_types";
import prisma from "@/prisma";

export async function addGoogleUser(sessionData: AddGoogleUserProps) {
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

