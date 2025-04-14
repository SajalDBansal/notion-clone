import { getDocuments } from "@/lib/prisma_functions/getDocuments";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";
    const documents = await getDocuments({
        id: id
    });
    return NextResponse.json(documents);
}