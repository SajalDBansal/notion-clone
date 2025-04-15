import { createDocument } from "@/lib/prisma_functions/createDocument";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        msg: "hello"
    })
}

export async function POST(req: NextRequest) {
    const user = await req.json();
    const docs = await createDocument({
        title: "Untitled",
        userId: user.data.userId,
        parentId: user.data.parentId,
    })

    return NextResponse.json(docs);
}