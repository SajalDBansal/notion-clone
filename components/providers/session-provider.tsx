"use client";

import { SessionProvider } from "next-auth/react";

export const SessionProvide = ({ children }: { children: React.ReactNode }) => {
    return <SessionProvider>
        {children}
    </SessionProvider>
}