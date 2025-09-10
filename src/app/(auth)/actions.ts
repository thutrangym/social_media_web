"use server"

import { lucia } from "@/auth";
import { validateRequest } from '@/lib/server-auth';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


export async function logout(){
    const { session } = await validateRequest();

    if (!session) {
        throw new Error("Not authenticated");
    }

    await lucia.invalidateSession(session.id);

    const setCookie = lucia.createBlankSessionCookie();
    (await cookies()).set(
        setCookie.name,
        setCookie.value,
        setCookie.attributes
    );

    return redirect("/login");

}