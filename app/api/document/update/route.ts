import { deleteDocumentIcon } from "@/lib/prisma_functions/Documents/update/deleteDocumentIcon";
import { updateDocument } from "@/lib/prisma_functions/Documents/update/updateDocument";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { id, ...rest } = body;
    try {
        const updatedDoc = await updateDocument({ id, documentData: rest });
        return NextResponse.json(updatedDoc);
    } catch (error) {
        console.error("Error updating document : ", error);
        throw new Error("Failed to update document")
    }
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const { id } = body;
    try {
        const updatedDoc = await deleteDocumentIcon({ id });
        return NextResponse.json(updatedDoc);
    } catch (error) {
        console.error("Error updating document : ", error);
        throw new Error("Failed to update document")
    }
}