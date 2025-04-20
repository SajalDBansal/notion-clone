"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Documents() {
    const session = useSession();
    const username = session.data?.user?.name?.split(" ")[0] || "Guest";

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/empty.jpg"
                height={300}
                width={300}
                alt="empty"
                className="dark:hidden"
            />
            <Image
                src="/empty-dark.png"
                height={300}
                width={300}
                alt="empty"
                className="hidden dark:block"
            />
            <h2 className="text-lg font-medium">
                Welcome to {username}&apos;s Notion
            </h2>
        </div>
    )
}