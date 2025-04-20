import prisma from "@/prisma";

export async function getDocuments({ id, parentId }: { id: string, parentId?: string }) {

    try {
        const documents = await prisma.document.findMany({
            where: {
                userId: id,
                parentId: parentId || null,
                isArchived: false,
            }
        })
        return documents;
    } catch (error) {
        console.error("Error creating document : ", error);
        throw new Error("Failed to create new document")
    }
}