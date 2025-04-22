import { NEXT_AUTH } from "@/lib/auth";
import { UpdateDocProps } from "@/lib/schema_types";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";

export async function updateDocument({ id, documentData }: { id: string, documentData: UpdateDocProps }) {
    const updatedPayload = updatePayload(documentData);
    const session = await getServerSession(NEXT_AUTH);
    try {
        const documents = await prisma.document.update({
            where: {
                id: id,
                userId: session.user.id
            },
            data: updatedPayload
        })
        return documents;
    } catch (error) {
        console.error("Error updating document : ", error);
        throw new Error("Failed to update document")
    }
}

function updatePayload(documentData: UpdateDocProps) {
    const updatePayload: UpdateDocProps = {};

    if (documentData.title !== undefined) updatePayload.title = documentData.title;
    if (documentData.content !== undefined) updatePayload.content = documentData.content;
    if (documentData.coverImage !== undefined) updatePayload.coverImage = documentData.coverImage;
    if (documentData.icon !== undefined) updatePayload.icon = documentData.icon;
    if (documentData.isPublished !== undefined) updatePayload.isPublished = documentData.isPublished;

    return updatePayload;
}