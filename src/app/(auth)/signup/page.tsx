import { Metadata } from "next";
import Image from "next/image";
import logo from '@/assets/logo.jpg';

import SignUpForm from "./SignUpForm";



export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Create a new account',
}

export default function Page() {
    return <main className="flex h-screen items-center justify-center p-5">
    <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] flex-row rounded-lg border bg-white p-6 shadow-lg">
            {/*Left Section*/}
            <div className="hidden w-1/2 flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600 p-10 text-white lg:flex">
                <Image
                    src={logo} 
                    alt="Logo" 
                    width={50} 
                    height={50} 
                    className="mb-6"
                />

                <h1 className="mb-4 text-3xl font-bold">Welcome to Our Web</h1>
                <p className="mt-2 text-center text-muted-foreground text-white">
                    Create your account and start connecting with miliions of people sharing their thougnts and ideas.
                </p>
                <ul className="space-y-2 text-left">
                    <li>Express yourself freely</li>
                    <li>Discover trending topics</li>
                    <li>Build your network</li>
                </ul>

            </div>
            {/*Right Section*/}
            
            <div className="flex w-full flex-col justify-center p-10 lg:w-1/2">
                <div className="mb-6 flex justify-center">
                    <Image
                        src={logo} 
                        alt="Logo"
                        width={48}
                        height={48}
                    />
                </div>
                <h2 className="mb-6 text-center text-2xl font-bold">
                    Create your account
                </h2>

                <SignUpForm />

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <hr className="flex-1 border-gray-300" />
                    <span className="px-2 text-sm text-gray-400">Or continue with</span>
                    <hr className="flex-1 border-gray-300" />
                </div>

                {/* Social buttons */}
                <div className="flex space-x-4">
                    <button className="flex flex-1 items-center justify-center rounded-md border py-2 hover:bg-gray-100">
                        <Image
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Google
                    </button>
                </div>

                
            </div>
        </div>
    </main>
}