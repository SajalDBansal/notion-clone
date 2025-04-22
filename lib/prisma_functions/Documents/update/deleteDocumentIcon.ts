import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";

export async function deleteDocumentIcon({ id }: { id: string }) {
    const session = await getServerSession(NEXT_AUTH);
    try {
        const documents = await prisma.document.update({
            where: {
                id: id,
                userId: session.user.id
            },
            data: {
                icon: null
            }
        })
        return documents;
    } catch (error) {
        console.error("Error updating document : ", error);
        throw new Error("Failed to update document")
    }
}