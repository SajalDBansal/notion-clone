import { PrismaClient } from "../generated/prisma";
import { SinginInput } from "../schema_types";

export async function isValidUser(data: SinginInput | undefined) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            email: data?.email,
            password: data?.password
        }
    })
    return user;
}
