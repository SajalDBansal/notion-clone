import { SinginInput } from "@/lib/schema_types";
import prisma from "@/prisma";


export async function isValidUser(data: SinginInput | undefined) {
    const user = await prisma.user.findFirst({
        where: {
            email: data?.email,
            password: data?.password
        }
    })
    return user;
}
