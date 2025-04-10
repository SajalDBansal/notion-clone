"use client";
import { ChangeEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react";

interface SignupInput {
    email: string,
    password: string,
    name: string
}

interface SinginInput {
    email: string,
    password: string
}

export const EntryUserData = ({ type }: { type: "signup" | "signin" }) => {
    const router = useRouter();

    const [signupInputs, setSignupInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    const [signinInputs, setSigninInputs] = useState<SinginInput>({
        email: "",
        password: ""
    })

    async function sendRequest() {
        if (type == "signup") {
            router.push("/");
            return;
        }
        const res = await signIn("credentials", {
            email: signinInputs.email,
            password: signinInputs.password,
        })
        // console.log(res);
        // router.push("/");
    }


    return (
        <div>
            <div className="px-10">
                <div className="text-4xl font-bold">
                    {type === "signup" ? "Create an account" : "Signin with email"}
                </div>
                <div className="text-center text-slate-500 mt-2">
                    {type === "signup" ? "Already have an account?" : "Don't have an Account"}

                    <Link href={type === "signin" ? "/signup" : "/signin"} className="pl-2 underline">
                        {type === "signup" ? "Login" : "Signup"}

                    </Link>


                </div>
            </div>
            <div className="pt-4">
                {type === "signup" ?
                    <LabledInput
                        lable={"Username"}
                        placeholder={"Enter your name"}
                        onChange={(e) => { setSignupInputs({ ...signupInputs, name: e.target.value }) }}
                    />
                    : null}

                <LabledInput
                    lable={"Email"}
                    type={"email"}
                    placeholder={"Enter your email Id"}
                    onChange={(e) => {
                        if (type === "signin") {
                            setSigninInputs({ ...signinInputs, email: e.target.value })
                        } else {
                            setSignupInputs({ ...signupInputs, email: e.target.value })
                        }
                    }}
                />

                <LabledInput
                    lable={"Password"}
                    type={"password"}
                    placeholder={"Enter password"}
                    onChange={(e) => {
                        if (type === "signin") {
                            setSigninInputs({ ...signinInputs, password: e.target.value })
                        } else {
                            setSignupInputs({ ...signupInputs, password: e.target.value })
                        }
                    }}
                />
            </div>

            <div className="pt-8">
                <button
                    type="button"
                    className="w-full text-white bg-gray-800 dark:bg-gray-300 dark:text-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 dark:hover:bg-gray-400 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={sendRequest}
                >
                    {type === "signup" ? "Sign up" : "Sign in"}
                </button>
            </div>
            <div className="pt-8">
                <button
                    type="button"
                    className="w-full text-white bg-gray-800 dark:bg-gray-300 dark:text-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:hover:bg-gray-400 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={async () => { await signIn("google") }}
                >
                    <div className="flex justify-center">
                        <svg className="w-6 h-6 text-white dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z" clipRule="evenodd" />
                        </svg>


                        <div className="pl-5">
                            Sign in with Google
                        </div>
                    </div>
                </button>
            </div>
        </div>

    )


}

interface LabledInputType {
    lable: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LabledInput({ lable, placeholder, onChange, type }: LabledInputType) {
    return (
        <div className="pt-4">
            <label
                htmlFor="first_name"
                className="block mb-2 text-md font-semibold pt-2"
            >
                {lable}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-3"
                placeholder={placeholder}
                required />
        </div>
    )
}