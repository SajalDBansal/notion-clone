import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "./generated/prisma";

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter email Id" },
                // email: { label: "Email", type: "email", placeholder: "Enter mail id" },
                password: { label: "Password", type: "password", placeholder: "Enter password" }
            },
            async authorize(credentials, req) {
                const user = await isValidUser(credentials);
                if (!user) {
                    throw new Error("Invalid_email_or_password");
                }
                const result = await createLog(user);
                return result.user;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({ session, token, user }: any) => {
            if (session.user) {
                session.user.id = token.sub;
            }
            return session
        }
    },
    pages: {
        signIn: "/signin",
        error: "/signin"
    }
}

async function isValidUser(data: Record<"email" | "password", string> | undefined) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            email: data?.email,
            password: data?.password
        }
    })
    return user;
}

type UserType = {
    id: string;
    name: string | null;
    email: string;
    password: string;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}

type UserinLog = UserType | null;

async function createLog(user: UserinLog) {
    const prisma = new PrismaClient();
    const result = await prisma.userLogs.create({
        data: {
            type: "User logged in",
            user: {
                connect: {
                    id: user?.id
                }
            }
        },
        select: {
            user: {
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            }

        }
    })
    return result;
}

