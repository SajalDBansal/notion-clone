"use client";

import { SettingModal } from "@/components/modals/SettingModal";
import { useEffect, useState } from "react";
import { CoverImageModal } from "@/components/modals/coverImageModal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <SettingModal />
            <CoverImageModal />
        </>
    )
}