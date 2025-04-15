"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AlreadyLogged = () => {
    const session = useSession();
    const router = useRouter();

    return (
        <div className="max-w-lg">
            <div className="px-10">
                <div className="text-4xl font-bold pb-10 text-center">
                    Sign in as
                    <div className="pt-2">
                        @{session.data?.user?.name}
                    </div>

                </div>
            </div>
            <div className="pt-8">
                <button
                    type="button"
                    className="w-full text-white bg-gray-800 dark:bg-gray-300 dark:text-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-gray-400 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={() => router.push("/")}
                >
                    Continue
                </button>
            </div>
            <div className="pt-8">
                <button
                    type="button"
                    className="w-full text-white bg-gray-800 dark:bg-gray-300 dark:text-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-gray-400 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={() => signOut()}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}