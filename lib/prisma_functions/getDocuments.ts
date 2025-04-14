import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function getDocuments({ id }: { id: string }) {
    try {
        const documents = await prisma.document.findMany({
            where: {
                userId: id
            }
        })
        return documents;
    } catch (error) {
        console.error("Error creating document : ", error);
        throw new Error("Failed to create new document")
    }
}