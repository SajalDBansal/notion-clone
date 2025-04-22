'use client';
import {
    UploaderProvider,
    type UploadFn,
} from '@/components/upload/uploader-provider';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/useCoverImage";
import { SingleImageDropzone } from '@/components/upload/single-image';
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { useParams } from "next/navigation";

export const CoverImageModal = () => {
    const params = useParams();
    const coverImage = useCoverImage();
    const { edgestore } = useEdgeStore();

    const [, setFile] = useState<File>();
    const [, setIsSubmitting] = useState(false);

    const onClose = React.useCallback(() => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }, [coverImage])


    const uploadFn: UploadFn = React.useCallback(
        async ({ file, onProgressChange, signal }) => {
            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url,
                },
                signal,
                onProgressChange,
            });

            // you can run some server action or api here
            // to add the necessary data to your database
            await axios.put(`/api/document/update`, {
                id: params.documentId,
                coverImage: res.url
            });
            onClose();
            return res;
        },
        [coverImage.url, edgestore.publicFiles, onClose, params.documentId],
    );

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <DialogTitle>
                    <div>
                        TODO: Upload image
                    </div>
                </DialogTitle>
                <UploaderProvider uploadFn={uploadFn} autoUpload>
                    <SingleImageDropzone
                        height={200}
                        width={200}
                        dropzoneOptions={{
                            maxSize: 1024 * 1024 * 1, // 1 MB
                        }}
                    />
                </UploaderProvider>
            </DialogContent>
        </Dialog>
    )


}