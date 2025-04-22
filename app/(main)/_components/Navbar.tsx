"use client";

import { DocumentType, MainNavbarProps } from "@/lib/schema_types";
import axios from "axios";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Title } from "./Title";
import { Banner } from "./Banner";
import { Menu } from "./Menu";
import { Button } from "@/components/ui/button";
import { Publish } from "./Publish";

export const Navbar = ({ isCollapsed, onResetWidth }: MainNavbarProps) => {
    const params = useParams();
    const [document, setDocument] = useState<DocumentType>();

    useEffect(() => {
        axios.get(`/api/document?documentId=${params.documentId}`)
            .then((res) => {
                setDocument(res.data)
            })
    }, [params.documentId])

    if (document === undefined) {
        return (
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
                <Title.Skeleton />
                <div className="flex items-center gap-x-2">
                    <Menu.Skeleton />
                </div>
            </nav>
        )
    }

    if (document === null) {
        return null;
    }

    return (
        <>
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon
                        role="button"
                        onClick={onResetWidth}
                        className="h-6 w-6 text-muted-foreground"
                    />
                )}
                <div className="flex items-center justify-between w-full">
                    <Title initialData={document} />
                    <div className="flex items-center gap-x-2">
                        <Button
                            size="sm" variant="outline"
                            onClick={() => window.location.href = `/documents/${params.documentId}`}
                        >
                            Refresh
                        </Button>
                        <Publish initialData={document} />
                        <Menu documentId={document.id} />
                    </div>
                </div>

            </nav>
            {document.isArchived && (
                <Banner documentId={document.id} />
            )}
        </>
    )
}