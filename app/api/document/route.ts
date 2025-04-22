import { getDocumentById } from "@/lib/prisma_functions/Documents/getDocumentById";
import { getDocuments } from "@/lib/prisma_functions/Documents/getDocuments";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");
    const preview = searchParams.get("preview");
    if (documentId) {
        const document = await getDocumentById({ documentId });
        if (preview) {
            if (document?.isPublished) {
                return NextResponse.json(document);
            } else {
                return NextResponse.json(null);
            }
        }
        return NextResponse.json(document);
    } else {
        const id = searchParams.get("id") || "";
        const parentId = searchParams.get("parentId") || "";
        const documents = await getDocuments({
            id: id, parentId: parentId
        });
        return NextResponse.json(documents);
    }
}