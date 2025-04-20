"use client";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ArchiveDocProps, CreateDocumentType, ItemsProps } from "@/lib/schema_types";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ChevronDown, ChevronRight, MoreHorizontal, Plus, Trash } from "lucide-react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    documentIcon,
    active,
    expanded,
    isSearch,
    onExpand,
    level = 0,
    userId,
    render
}: ItemsProps) => {
    const router = useRouter();
    const session = useSession();

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    }

    const onCreate = async (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        await createNewDocument({
            title: "Untitled",
            parentId: id,
            userId: userId
        })
        if (!expanded) {
            onExpand?.();
        }
        router.refresh();
        // router.push(`/documents/${childDoc.id}`);
    }

    const onArchive = async (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        await archiveDocument({ id, userId, isArchived: false });
        if (render) render();
    }

    async function createNewDocument({ parentId, userId }: CreateDocumentType) {
        try {
            const doc = await axios.post("/api/document/create", {
                data: {
                    userId: userId,
                    parentId: parentId,
                }
            });
            if (render) render();
            return doc;
        } catch (error) {
            console.error("Error while creating a new document : ", error)
        }
    }

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

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div
            onClick={onClick}
            role="button"
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
            className={cn(
                "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium cursor-pointer",
                active && "bg-primary/5 text-primary"
            )}
        >
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (
                <Icon
                    className="shrink-0 h-[18px] mr-2 text-muted-foreground"
                />
            )}
            <span className="truncate">
                {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">ctrl</span> + K
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                            <div
                                role="button"
                                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600">
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="text-xs text-muted-foreground p-2">
                                Last edited by : {session.data?.user?.name}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        role="button"
                        onClick={onCreate}
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            )}
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />

        </div>
    )
}