import { UserinLog } from "@/lib/schema_types";
import prisma from "@/prisma";

export async function createLog(user: UserinLog) {
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
