import { getServerSession } from "next-auth"
import { EntryUserData } from "./Sign"
import { AlreadyLogged } from "./Log";
import { NEXT_AUTH } from "@/lib/auth";

export const Authpage = async ({ type }: { type: "signup" | "signin" }) => {
    return (
        <div className="h-screen flex flex-col justify-center dark:bg-[#1F1F1F]">
            <div className="flex justify-center">
                <CheckLoggedin type={type} />

            </div>
        </div >
    )
}

async function CheckLoggedin({ type }: { type: "signup" | "signin" }) {
    const session = await getServerSession(NEXT_AUTH);

    if (!session) {
        return (
            <EntryUserData type={type} />
        )
    }
    return (
        <div>
            <AlreadyLogged />
        </div>
    )


}

