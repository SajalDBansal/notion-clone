import prisma from "@/prisma";

export async function unarchivedDoc(id: string, userId: string) {
    try {
        const unarchived = await prisma.document.update({
            where: {
                id: id,
                userId: userId,
            }, data: {
                isArchived: false,
                parentId: null
            }
        })
        return unarchived;
    } catch (error) {
        return new Error("error while archiving doc :" + error);
    }
}