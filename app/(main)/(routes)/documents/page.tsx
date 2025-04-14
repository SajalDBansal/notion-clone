"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";

export default function Documents() {
    const [loading, setLoading] = useState(false);
    const session = useSession();
    const username = session.data?.user?.name?.split(" ")[0] || "Guest";

    async function createNewDocument() {
        try {
            setLoading(true);
            await axios.post("http://localhost:3000/api/document/create", {
                data: {
                    userId: session.data?.user?.id
                }
            });
        } catch (error) {
            console.error("Error while creating a new document : ", error)

        } finally {
            setLoading(false);
            window.location.reload();
        }
    }

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
            <Button onClick={createNewDocument}>
                <PlusCircle className="h-4 w-4 mr-2" />
                {loading ? "Creating..." : "Create a note"}
            </Button>
        </div>
    )
}