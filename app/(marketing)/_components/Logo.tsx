import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";


const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
})

export const Logo = () => {
    return (
        <Link href={"/"}>
            <div className="hidden md:flex items-center gap-x-2">
                <Image
                    src="/Notion-logo.svg"
                    height="40"
                    width="40"
                    alt="logo"
                    className="dark:hidden"
                />
                <Image
                    src="/Notion-logo-dark.svg"
                    height="40"
                    width="40"
                    alt="logo"
                    className="hidden dark:block"
                />
                <p className={cn("font-semibold", font.className)}>Notion</p>

            </div>
        </Link>
    )
}