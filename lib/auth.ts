import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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

                // console.log(credentials);

                // add function to authenticate user
                // add function to send user signin data to prisma

                return {
                    id: "userid",
                    name: "sajal",
                    email: "sajala@gmail.com"
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: { user?: { id: string }, token: any }) => {
            // console.log(token);
            // token.userId = token.sub;
            // if (user) {
            //     token.user.id = user.id;
            // }
            return token;
        },
        session: ({ session, token, user }: any) => {
            if (session.user) {
                session.user.id = token.sub;
            }
            console.log(session);

            return session
        }
    },
    pages: {
        signIn: "/signin"
    }
}