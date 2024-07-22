"use server"
import {destroySession} from "@/lib/auth/auth";
import {redirect} from "next/navigation";

export async function logout() {
    await destroySession()
    redirect("/")
}