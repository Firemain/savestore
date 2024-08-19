"use server";

import { createAuthSession } from "@/lib/auth";
import { verifyPassword } from "@/lib/hash";
import { getUser } from "@/lib/shopping";
import { redirect } from 'next/navigation'

export default async function login(formData) {

    console.log("Attempting to login with:", formData.get('username'), formData.get('password'));
    const user = formData.get('username');
    const password = formData.get('password');

    const existingUser = await getUser(user);
    const isValidPassword  = verifyPassword(existingUser.password, password);

    if(!isValidPassword) {
        return {
            error: "Invalid password"
        };
    }

    await createAuthSession(existingUser.id);
    redirect('/shop/admin/dashboard');

}

