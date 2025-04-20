"use client";
import { useSession } from "next-auth/react";
import { Navigation } from "./_components/Navigation";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";
import { SearchCommand } from "@/components/SearchCommand";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = useSession();

    if (session.status == "loading") {
        return (
            <div>
                <Spinner />
            </div>
        )
    } else if (session.status == "unauthenticated") {
        return redirect("/signup");
    }

    return (
        <div className="h-full flex drak:bg-[#1F1F1F]">
            <Navigation />
            <main className="flex-1 h-full overflow-auto">
                <SearchCommand />
                {children}
            </main>
        </div>
    );
}
