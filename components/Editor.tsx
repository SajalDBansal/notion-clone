"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";
import { EditorProps } from "@/lib/schema_types";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });
        return response.url;
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: handleUpload
    });

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!editor || !onChange) return;

        const unsubscribe = editor.onChange(() => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => {
                const content = JSON.stringify(editor.document, null, 2);
                onChange(content);
            }, 2000);
        });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [editor, onChange]);

    return (
        <div>
            <BlockNoteView
                editor={editor}
                editable={editable}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
            />
        </div>
    )
}

export default Editor;