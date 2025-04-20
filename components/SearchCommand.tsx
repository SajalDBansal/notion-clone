'use client';
import { File } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import axios from "axios";
import { DocumentType } from "@/lib/schema_types";
import { useSearch } from "@/hooks/useSearch";

export const SearchCommand = () => {
    const session = useSession();
    const sessionUser = session.data?.user as { id: string, name: string };
    const router = useRouter();
    const [documents, setDocuments] = useState<DocumentType[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        axios.get(`/api/document?id=${sessionUser.id}`)
            .then((res) => {
                setDocuments(res.data);
            })
    }, [sessionUser.id])

    useEffect(() => {
        setIsMounted(true);
    }, [])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        }
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggle])

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`);
        onClose();
    }

    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search ${sessionUser.name}'s Notion...`} />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {documents?.map((doc) => (
                        <CommandItem
                            key={doc.id}
                            value={`${doc.id}-${doc.title}`}
                            title={doc.title}
                            onSelect={onSelect}
                        >
                            {doc.icon ? (
                                <p className="mr-2 text-[18px]">
                                    {doc.icon}
                                </p>
                            ) : (
                                <File className="mr-2 h-4 w-4" />
                            )}
                            <span>
                                {doc.title}
                            </span>
                        </CommandItem>
                    ))}

                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}