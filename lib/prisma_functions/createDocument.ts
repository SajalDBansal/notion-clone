import { PrismaClient } from "../generated/prisma";
import { CreateDocumentType } from "../schema_types";

const prisma = new PrismaClient();

export async function createDocument(data: CreateDocumentType) {
    try {
        const document = prisma.document.create({
            data: {
                title: data.title,
                parentId: data.parentId || undefined,
                userId: data.userId,
                isArchived: false,
                isPublished: false
            }
        })

        return document;

    } catch (error) {
        console.error("Error creating document : ", error);
        throw new Error("Failed to create new document")
    }
}