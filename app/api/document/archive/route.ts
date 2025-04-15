import { archiveDoc } from "@/lib/prisma_functions/archiveDoc";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        msg: "hello"
    })
}

export async function PUT(req: NextRequest) {
    const user = await req.json();
    try {
        const archived = await archiveDoc({
            id: user.id,
            userId: user.userId,
            isArchived: user.isArchived
        });
        return NextResponse.json(archived);
    } catch (error) {
        return NextResponse.json({ msg: "Some error while archivng doc", error });
    }
}