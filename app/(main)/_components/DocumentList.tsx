"use client";

import { DocumentListProps, DocumentType } from "@/lib/schema_types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Item } from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { useRender } from "@/hooks/useRender";

export const DocumentList = (
    { parentId, level = 0, loading }: DocumentListProps) => {
    const { render } = useRender();
    const params = useParams();
    const router = useRouter();
    const session = useSession();
    const sessionUser = session.data?.user as { id: string };

    const [documents, setDocuments] = useState<DocumentType[]>([]);

    const documentsFetchUrl = parentId ?
        `/api/document?id=${sessionUser.id}&parentId=${parentId}` :
        `/api/document?id=${sessionUser.id}`;

    useEffect(() => {
        axios.get(documentsFetchUrl)
            .then((res) => {
                setDocuments(res.data);
            })
    }, [documentsFetchUrl, loading, render])

    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }));
    };

    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    }

    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                )}
            </>
        )
    }

    return (
        <>
            <p style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : undefined
            }}
                className={cn(
                    "hidden text-sm font-medium text-muted-foreground/80",
                    expanded && "last:block",
                    level === 0 && "hidden"
                )}
            >
                No pages inside
            </p>
            {documents.map((doc) => (
                <div key={doc.id}>
                    <Item
                        id={doc.id}
                        onClick={() => onRedirect(doc.id)}
                        label={doc.title}
                        icon={FileIcon}
                        documentIcon={doc.icon}
                        active={params.documentId === doc.id}
                        level={level}
                        onExpand={() => onExpand(doc.id)}
                        expanded={expanded[doc.id]}
                        userId={sessionUser.id}
                    />
                    {expanded[doc.id] && (
                        <DocumentList
                            parentId={doc.id}
                            level={level + 1}
                        />
                    )}
                </div>
            ))}
        </>
    )

}