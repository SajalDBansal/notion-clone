/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { isValidUser } from "@/lib/prisma_functions/user/isValidUser";
import { createLog } from "@/lib/prisma_functions/user/createLog";
import { addGoogleUser } from "@/lib/prisma_functions/user/addGoogleUser";

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
        signIn: async ({ account, profile }: any) => {
            if (account.provider === "google") {
                const isExisit = await isValidUser({ email: profile.email, password: profile.name });
                if (!isExisit) {
                    const user = await addGoogleUser(profile);
                    await createLog(user);
                } else {
                    await createLog(isExisit);
                }
            }
            return true;
        },
        session: ({ session, token }: any) => {
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