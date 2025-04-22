"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/useCoverImage";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "@/components/ui/skeleton";

export const Cover = ({ url, preview }: { url?: string, preview?: boolean }) => {
    const { edgestore } = useEdgeStore();
    const coverImage = useCoverImage();
    const params = useParams();

    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url,
            });
            await axios.delete("/api/document/update/image", { data: { id: params.documentId } })
        }
    }

    return (
        <div className={cn(
            "relative w-full h-[35vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <Image
                    src={url}
                    fill
                    alt="Cover"
                    className="object-cover"
                />
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button
                        onClick={() => coverImage.onReplace(url)}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="w-4 h-4" />
                        Change cover
                    </Button>
                    <Button
                        onClick={onRemove}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <X className="w-4 h-4" />
                        Remove
                    </Button>

                </div>
            )}
            Cover image
        </div>
    )
}

Cover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton className="w-full h-[12vh]" />
    )
}