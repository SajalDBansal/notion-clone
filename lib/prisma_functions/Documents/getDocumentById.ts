import prisma from "@/prisma";

export async function getDocumentById({ documentId }: { documentId: string }) {
    try {
        const document = await prisma.document.findFirst({
            where: {
                id: documentId,
            }
        })
        return document;
    } catch (error) {
        console.error("Error getting document : ", error);
        throw new Error("Failed to get document")
    }
}