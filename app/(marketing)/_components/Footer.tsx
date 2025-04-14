import { Button } from "@/components/ui/button"
import { Logo } from "./Logo"
import Link from "next/link"

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F] mt-20">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <Link href={"/privacy_policy"}>
                    <Button variant="ghost" size="sm">
                        Privacy Policy
                    </Button>
                </Link>
                <Link href={"/terms"}>
                    <Button variant="ghost" size="sm">
                        Terms & Conditions
                    </Button>
                </Link>
            </div>
        </div>
    )
}