import prisma from "@/prisma";

export async function getArchivedDocs(userId: string) {
    try {
        const archived = await prisma.document.findMany({
            where: {
                userId: userId,
                isArchived: true
            }
        })
        return archived;
    } catch (error) {
        return new Error("error while archiving doc :" + error);
    }
}