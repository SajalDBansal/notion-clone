"use client";

import { ConfirmModal } from "@/components/modals/confirmModal";
import { Button } from "@/components/ui/button";
import { useRender } from "@/hooks/useRender";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Banner = ({ documentId }: { documentId: string }) => {
    const router = useRouter();
    const session = useSession();
    const sessionUser = session.data?.user as { id: string };
    const [, setLoading] = useState(false);
    const { setRender } = useRender();

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

    const onRestore = async () => {
        await unArchiveDocument(documentId, true)
        setRender();
    }

    const onRemove = async () => {
        await deleteDocument(documentId)
        setRender();
        router.push("/documents");
    }

    return (
        <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>
                This page is in the Trash.
            </p>
            <Button
                size="sm"
                onClick={onRestore}
                variant="outline"
                className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
            >
                Restore Page
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size="sm"
                    variant="outline"
                    className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                >
                    Delete Forever
                </Button>
            </ConfirmModal>
        </div>
    )

}