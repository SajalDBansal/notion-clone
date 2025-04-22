import { LucideIcon } from "lucide-react";
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

export type DocumentType = {
    content?: string,
    coverImage?: string,
    createdAt: string,
    icon?: string
    id: string,
    isArchived: boolean,
    isPublished: boolean,
    parentId?: string
    title: string,
    updatedAt?: string,
    userId: string
}

export type ArchiveDocProps = {
    userId: string,
    id: string,
    isArchived?: boolean,
}

export type AddGoogleUserProps = {
    sub: string,
    name: string,
    email: string,
    password: string,
    picture: string,
}

export type ItemsProps = {
    id?: string,
    documentIcon?: string,
    active?: boolean,
    expanded?: boolean,
    isSearch?: boolean,
    level?: number,
    label: string,
    onClick?: () => void,
    onExpand?: () => void,
    icon: LucideIcon,
    userId: string,
}

export type ConfirmModalProps = {
    children: React.ReactNode,
    onConfirm: () => void,
}

export type SearchStore = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    toggle: () => void
}

export type SettingStore = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

export type RenderStore = {
    render: boolean,
    setRender: () => void,
}

export type MainNavbarProps = {
    isCollapsed: boolean,
    onResetWidth: () => void
}

export type UpdateDocProps = {
    title?: string,
    content?: string,
    coverImage?: string,
    icon?: string,
    isPublished?: boolean
}

export type DocumentListProps = {
    parentId?: string,
    level?: number,
    loading?: boolean
    data?: DocumentType[],
}

export type IconPickerProps = {
    onChange: (icon: string) => void,
    children: React.ReactNode,
    asChild?: boolean
}

export type EditorProps = {
    onChange: (value: string) => void,
    initialContent?: string,
    editable?: boolean
}

export type CoverImageStore = {
    url?: string
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    onReplace: (url: string) => void,
}