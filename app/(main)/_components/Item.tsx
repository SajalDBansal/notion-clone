"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateDocumentType } from "@/lib/schema_types";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react"
import { useRouter } from "next/navigation";

type ItemsProps = {
    id?: string,
    documentIcon?: string,
    active?: boolean,
    expanded?: boolean,
    isSearch?: boolean,
    level?: number,
    label: string,
    onClick: () => void,
    onExpand?: () => void,
    icon: LucideIcon,
    userId: string
}

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
    userId
}: ItemsProps) => {
    const router = useRouter();

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
        const childDoc = await createNewDocument({
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

    async function createNewDocument({ parentId, userId }: CreateDocumentType) {
        try {
            const doc = await axios.post("http://localhost:3000/api/document/create", {
                data: {
                    userId: userId,
                    parentId: parentId,
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
                    className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
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