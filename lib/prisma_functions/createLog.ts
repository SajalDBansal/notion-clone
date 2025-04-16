import { PrismaClient } from "@prisma/client"
import { UserinLog } from "../schema_types";

export async function createLog(user: UserinLog) {
    const prisma = new PrismaClient();
    const result = await prisma.userLogs.create({
        data: {
            type: "User logged in",
            user: {
                connect: {
                    id: user?.id
                }
            }
        },
        select: {
            user: {
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            }

        }
    })
    return result;
}
