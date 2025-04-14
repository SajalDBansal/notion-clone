import { z } from "zod";


export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export type SignupInput = z.infer<typeof signupInput>

export type SinginInput = z.infer<typeof signinInput>

export type UserType = {
    id: string;
    name: string | null;
    email: string;
    password: string;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type UserinLog = UserType | null;

export type CreateDocumentType = {
    title: string,
    parentId?: string,
    userId: string
}