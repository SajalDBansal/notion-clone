import { SignupInput } from "@/lib/schema_types";
import prisma from "@/prisma";


export async function createUser(userData: SignupInput) {
    await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            UserLogs: {
                create: {
                    type: "New user crearted"
                }
            }
        },
        select: {
            id: true,
            email: true,
            name: true
        }
    })
}