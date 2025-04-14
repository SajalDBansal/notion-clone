import { PrismaClient } from "@/lib/generated/prisma";
import { signupInput } from "@/lib/schema_types";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    return NextResponse.json({ msg: "hello" });
}

export async function POST(req: NextRequest) {
    const fecthedData = await req.json();
    const userData = fecthedData.data || fecthedData
    const { success } = signupInput.safeParse(userData);
    if (success) {
        try {
            const user = await prisma.user.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    UserLogs: {
                        create: {
                            type: "New user crearted"
                        }
                    }
                },
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            })
            return NextResponse.json(user);
        } catch (error) {
            return NextResponse.json({ error: error });
        }
    } else {
        return NextResponse.json({ error: "Incorrect data entry" });
    }
}