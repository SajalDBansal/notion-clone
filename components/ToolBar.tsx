"use client";

import { DocumentType } from "@/lib/schema_types";
import { IconPicker } from "./IconPicker";
import { Button } from "@/components/ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { useRender } from "@/hooks/useRender";
import { useCoverImage } from "@/hooks/useCoverImage";

export const ToolBar = ({ initialData, preview }: { initialData: DocumentType, preview?: boolean }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);
    const [document, setDocument] = useState<DocumentType>(initialData);
    const { setRender } = useRender();
    const coverImage = useCoverImage();

    useEffect(() => {
        setDocument(initialData);
    }, [initialData]);

    const enableInput = () => {
        if (preview) return;
        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0)
    }

    const disableInput = () => {
        setIsEditing(false)
    }

    const onInput = async (value: string) => {
        setValue(value);
    }

    const onKeyDown = async (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter") {
            const title = event.currentTarget.value || "Untitled";
            const updatedDoc = await axios.put(`/api/document/update`, { id: initialData.id, title: title || "Untitled" });
            setDocument(updatedDoc.data);
            disableInput();
            setRender();
        }
    };

    const onIconSelect = async (icon: string) => {
        const updatedDoc = await axios.put(`/api/document/update`, { id: initialData.id, icon });
        setDocument(updatedDoc.data);
        setRender();
    }

    const onRemoveIcon = async () => {
        const updatedDoc = await axios.delete(`/api/document/update`, { data: { id: initialData.id } });
        setDocument(updatedDoc.data);
        setRender();
    }

    return (
        <div className="pl-[54px] group relative">
            {!!document.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={onIconSelect}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {document.icon}
                        </p>
                    </IconPicker>
                    <Button
                        onClick={onRemoveIcon}
                        className="ronded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                        variant="outline"
                        size="icon"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            {!!document.icon && preview && (
                <p className="text-6xl pt-6">
                    {document.icon}
                </p>
            )}
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!document.icon && !preview && (
                    <IconPicker asChild onChange={onIconSelect}>
                        <Button className="text-muted-foreground text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <Smile className="h-4 w-4 mr-2" />
                            Add icon
                        </Button>
                    </IconPicker>
                )}
                {!document.coverImage && !preview && (
                    <Button
                        onClick={coverImage.onOpen}
                        className="text-muted-foreground text-xs" variant="outline"
                        size="sm">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Add cover
                    </Button>
                )}
            </div>
            {isEditing && !preview ? (
                <TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
                >
                    {document.title}
                </div>
            )}
        </div>
    )
}