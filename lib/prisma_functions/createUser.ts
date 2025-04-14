import { PrismaClient } from "../generated/prisma"
import { SignupInput } from "../schema_types";

export async function createUser(userData: SignupInput) {
    const prisma = new PrismaClient();
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