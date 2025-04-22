import { deleteDocumentImage } from "@/lib/prisma_functions/Documents/update/deleteDocumentImage";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const { id } = body;
    try {
        const updatedDoc = await deleteDocumentImage({ id });
        return NextResponse.json(updatedDoc);
    } catch (error) {
        console.error("Error updating document : ", error);
        throw new Error("Failed to update document")
    }
}