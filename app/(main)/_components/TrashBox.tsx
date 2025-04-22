"use client";

import { ConfirmModal } from "@/components/modals/confirmModal";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner";
import { useRender } from "@/hooks/useRender";
import { DocumentType } from "@/lib/schema_types";
import axios from "axios";
import { Search, Trash, Undo } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const [archivedDocs, setArchivedDocs] = useState<DocumentType[]>([]);
    const [trashLoader, setTrashLoader] = useState(false);
    const session = useSession();
    const sessionUser = session.data?.user as { id: string };
    const [loading, setLoading] = useState(false);
    const { setRender } = useRender();

    const [search, setSearch] = useState("");

    useEffect(() => {
        try {
            setTrashLoader((t) => !t);
            axios.get("/api/document/archive")
                .then((res) => {
                    setArchivedDocs(res.data.archivedDocs);
                })
        } catch (error) {
            console.error("Error while creating a new document : ", error)
        } finally {
            setTrashLoader((t) => !t);
        }
    }, [trashLoader, loading])

    async function unArchiveDocument(id: string, isArchived: boolean) {
        try {
            setLoading(true);
            await axios.put("/api/document/archive", {
                data: {
                    userId: sessionUser.id,
                    id: id,
                    isArchived
                }
            });
        } catch (error) {
            console.error("Error while unarchiving document : ", error)
        } finally {
            setLoading(false);
        }
    }

    async function deleteDocument(id: string) {
        try {
            setLoading(true);
            const deletedDoc = await axios.delete("/api/document/archive", {
                data: {
                    userId: sessionUser.id,
                    id: id
                }
            });
            return deletedDoc.data;
        } catch (error) {
            console.error("Error while unarchiving document : ", error)
        } finally {
            setLoading(false);
        }
    }

    const filteredDocs = archivedDocs?.filter((doc) => {
        return doc.title.toLowerCase().includes(search.toLowerCase());
    })

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    }

    const onRestore = async (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: string
    ) => {
        event.stopPropagation();
        await unArchiveDocument(documentId, true);
        setRender();
    }

    const onRemove = async (
        documentId: string
    ) => {
        const deleted = await deleteDocument(documentId);
        setTrashLoader((t) => t!)
        setRender();
        if (params.documentId === deleted.id) {
            router.push(`/documents`);
        }
    }

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Filter by page title..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No documents found
                </p>
                {filteredDocs.map((doc) => (
                    <div
                        key={doc.id}
                        role="button"
                        onClick={() => onClick(doc.id)}
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
                    >
                        <span className="truncate pl-2">
                            {doc.title}
                        </span>
                        <div className="flex items-center">
                            <div
                                onClick={(e) => onRestore(e, doc.id)}
                                role="button"
                                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                            >
                                <Undo className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(doc.id)}>
                                <div
                                    role="button"
                                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                >
                                    <Trash className="w-4 h-4 text-muted-foreground" />
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}