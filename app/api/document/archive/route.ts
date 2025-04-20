import { NEXT_AUTH } from "@/lib/auth";
import { archiveDoc } from "@/lib/prisma_functions/Documents/archive/archiveDoc";
import { getArchivedDocs } from "@/lib/prisma_functions/Documents/archive/getArchivedDocs";
import { unarchivedDoc } from "@/lib/prisma_functions/Documents/archive/unArchiveDoc";
import { deleteDocument } from "@/lib/prisma_functions/Documents/deleteDocument";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(NEXT_AUTH);
    try {
        const archived = await getArchivedDocs(session.user.id);
        return NextResponse.json({ archivedDocs: archived });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error("Some error while archiving doc");
    }
}

export async function PUT(req: NextRequest) {
    const doc = await req.json();

    if (!doc.data.isArchived) {
        try {
            const archived = await archiveDoc({
                id: doc.data.id,
                userId: doc.data.userId,
                isArchived: doc.data.isArchived
            });
            return NextResponse.json(archived);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new Error("Some error while archiving doc");
        }
    } else {
        try {
            const archived = await unarchivedDoc(doc.data.id, doc.data.userId);
            return NextResponse.json(archived);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new Error("Some error while unarchiving doc");
        }
    }
}

export async function DELETE(req: NextRequest) {
    const doc = await req.json();
    console.log(doc);

    try {
        const deletedDoc = await deleteDocument(doc.id, doc.userId);
        return NextResponse.json(deletedDoc);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error("Some error while deleting doc");
    }

}