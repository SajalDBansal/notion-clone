"use client";

import { useScrollTop } from "@/hooks/user-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const Navbar = () => {
    const scrolled = useScrollTop();
    return (
        <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">

                <LogOrSign />

                <Link href={"/adv"}>
                    <Button>
                        Get Notion Free
                    </Button>
                </Link>


                <ModeToggle />
            </div>
        </div>
    )
}

function LogOrSign() {
    const session = useSession();

    if (session.status == "unauthenticated") {
        return (
            <Link href={"/signup"}>
                <Button>
                    Signup
                </Button>
            </Link>
        )
    }
    return (
        <Button onClick={() => signOut()}>
            Logout
        </Button>
    )

}