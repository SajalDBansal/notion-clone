"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useRender } from "@/hooks/useRender";
import { DocumentType } from "@/lib/schema_types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export const Title = ({ initialData }: { initialData: DocumentType }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState(initialData.title || "Untitled");
    const [isEditing, setIsEditing] = useState(false);
    const [document, setDocument] = useState<DocumentType>(initialData);
    const { render, setRender } = useRender();

    useEffect(() => {
        setDocument(initialData);
    }, [initialData, render]);

    const enableInput = () => {
        setTitle(initialData.title);
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0)
    }

    const disableInput = () => {
        setIsEditing(false)
    }

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTitle(event.target.value);
    }

    const onKeyDown = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            const title = event.currentTarget.value || "Untitled";
            const updatedDoc = await axios.put(`/api/document/update`, { id: initialData.id, title: title || "Untitled" });
            setDocument(updatedDoc.data);
            disableInput();
            setRender();
        }
    };

    return (
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing ? (
                <Input
                    ref={inputRef}
                    onClick={enableInput}
                    onBlur={disableInput}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={title}
                    className="h-7 px-2 focus-visible:ring-transparent"
                />
            ) : (
                <Button
                    onClick={enableInput}
                    variant="ghost"
                    className="font-normal h-auto p-1"
                >
                    <span className="truncate">
                        {title}
                    </span>
                </Button>
            )}

        </div>
    )
}

Title.Skeleton = function TitleSeleton() {
    return (
        <Skeleton className="h-6 w-20 rounded-md" />
    )
}