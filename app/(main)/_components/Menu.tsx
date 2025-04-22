"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useRender } from "@/hooks/useRender";
import { ArchiveDocProps } from "@/lib/schema_types";
import axios from "axios";
import { MoreHorizontal, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Menu = ({ documentId }: { documentId: string }) => {
    const router = useRouter();
    const session = useSession();
    const { setRender } = useRender();
    const sessionUser = session.data?.user as { id: string, name: string };

    async function archiveDocument({ id, userId, isArchived }: ArchiveDocProps) {
        try {
            const doc = await axios.put("/api/document/archive", {
                data: {
                    id: id,
                    userId: userId,
                    isArchived: isArchived
                }
            });
            return doc;
        } catch (error) {
            console.error("Error while creating a new document : ", error)
        }
    }

    const onArchive = async () => {
        if (!documentId) return;
        await archiveDocument({ id: documentId, userId: sessionUser.id, isArchived: false });
        setRender();
        router.push("/documents");
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground p-2">
                    Last edited by : {sessionUser.name}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="h-10 w-10" />
    )
}