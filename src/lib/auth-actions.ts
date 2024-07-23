"use server"
import 'server-only'
import {destroySession} from "@/lib/auth/auth";
import {redirect} from "next/navigation";

export async function logout() {
    await destroySession()
    redirect("/")
}