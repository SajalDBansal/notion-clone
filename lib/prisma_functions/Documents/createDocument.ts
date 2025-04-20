import { CreateDocumentType } from "@/lib/schema_types";
import prisma from "@/prisma";

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