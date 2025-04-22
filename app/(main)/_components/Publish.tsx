"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useOrigin } from "@/hooks/useOrigin";
import { DocumentType } from "@/lib/schema_types";
import axios from "axios";
import { Check, Copy, Globe } from "lucide-react";
import { useState } from "react";

export const Publish = ({ initialData }: { initialData: DocumentType }) => {
    const origin = useOrigin();
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [document, setDocument] = useState<DocumentType>(initialData);

    const url = `${origin}/preview/${initialData.id}`;

    const onPublish = async () => {
        setIsSubmitting(true);
        const updatedDoc = await axios.put(`/api/document/update`, { id: initialData.id, isPublished: true });
        setDocument(updatedDoc.data);
        setIsSubmitting(false);
    }

    const onUnPublish = async () => {
        setIsSubmitting(true);
        const updatedDoc = await axios.put(`/api/document/update`, { id: initialData.id, isPublished: false });
        setDocument(updatedDoc.data);
        setIsSubmitting(false);
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" variant="outline">
                    Publish
                    {document.isPublished && (
                        <Globe
                            className="text-sky-500 w-4 h-4 ml-2"
                        />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-72"
                align="end"
                alignOffset={8}
                forceMount
            >
                {document.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="text-sky-500 animated-pulse h-4 w-4" />
                            <p className="text-xs font-medium text-sky-500">
                                This not is live on web
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input value={url} className="flex-1 px-2 text-xs border rinded-l-md h-8 bg-muted truncate" disabled />
                            <Button
                                onClick={onCopy}
                                disabled={copied}
                                className="h-8 rounded-l-none"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <Button
                            size="sm"
                            className="w-full text-xs"
                            disabled={isSubmitting}
                            onClick={onUnPublish}
                        >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium mb-2">
                            Publish this note
                        </p>
                        <span className="text-xs text-muted-foreground mb-4">
                            Share your work with others
                        </span>
                        <Button
                            disabled={isSubmitting}
                            onClick={onPublish}
                            className="w-full text-xs"
                            size="sm"
                        >
                            Publish
                        </Button>
                    </div>
                )}

            </PopoverContent>
        </Popover>
    )
}