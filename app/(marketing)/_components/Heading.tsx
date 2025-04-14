
import { Button } from "@/components/ui/button";
import { NEXT_AUTH } from "@/lib/auth";
import { ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const Heading = () => {

    return (
        <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
                Your Ideas, Documents, & Plans Unified. Welcome to <span className="underline">Notion</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Notion is the connected workspace where <br /> better faster work happens
            </h3>
            <Buttonproperty />
        </div>
    )
}

async function Buttonproperty() {
    const session = await getServerSession(NEXT_AUTH);
    const tagret = !session ? "/signin" : "/documents";

    return (
        <Link href={tagret}>
            <Button>
                Enter Notion
                <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
        </Link>
    )

}