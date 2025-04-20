import prisma from "@/prisma";

export async function deleteDocument(id: string, userId: string) {
    try {
        const deleted = await prisma.document.delete({
            where: {
                id: id,
                userId: userId,
            }
        })
        return deleted;
    } catch (error) {
        return new Error("error while archiving doc :" + error);
    }
}