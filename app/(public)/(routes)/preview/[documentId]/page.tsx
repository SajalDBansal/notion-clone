"use client";

import { Cover } from "@/components/Cover";
import { ToolBar } from "@/components/ToolBar";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentType } from "@/lib/schema_types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DocumentIdPage() {
    const Editor = useMemo(() => dynamic(() => import("@/components/Editor"), { ssr: false }), []);
    const params = useParams();
    const [document, setDocument] = useState<DocumentType>();

    useEffect(() => {
        axios.get(`/api/document?documentId=${params.documentId}&preview=true`)
            .then((res) => {
                setDocument(res.data)
            })
    }, [params.documentId])

    const onChange = async (content: string) => {
        await axios.put(`/api/document/update`, { id: params.documentId, content });
    }

    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />

                    </div>
                </div>
            </div>
        )
    }

    if (document === null) {
        return (
            <div className="h-full flex flex-col justify-center items-center space-y-4">
                <Image
                    src={"/error.png"}
                    height={300}
                    width={300}
                    alt="Error"
                    className="dark:hidden"
                />
                <Image
                    src={"/error-dark.png"}
                    height={300}
                    width={300}
                    alt="Error"
                    className="hidden dark:block"
                />

                <h2 className="text-xl font-medium">
                    The requested page not found
                </h2>
                <Button>
                    <Link href={"/documents"}>
                        Go back
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="pb-40">
            <Cover preview url={document.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <ToolBar preview initialData={document} />
                <Editor
                    editable={false}
                    onChange={onChange}
                    initialContent={document.content}
                />
            </div>
        </div>
    )
}