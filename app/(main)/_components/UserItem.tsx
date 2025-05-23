"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ChevronsLeftRight } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export const UserItem = () => {
    const session = useSession();
    const user = session.data?.user;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="h-7 w-7">
                            <AvatarImage src={user?.image || "./blankUser.png"} />
                        </Avatar>
                        <span className="text-start font-medium line-clamp-1">
                            {user?.name}&apos;s Notion
                        </span>
                    </div>
                    <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80"
                align="start"
                alignOffset={11}
                forceMount
            >
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground text-center">
                        {user?.email}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-md bg-secondary p-1">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.image || "./blankUser.png"} />
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <Link href={"/profile"}>
                                <p className="text-sm line-clamp-1">
                                    {user?.name}&apos;s Notion
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="w-full cursor-pointer text-muted-foreground">
                    <Button variant={"ghost"} onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}