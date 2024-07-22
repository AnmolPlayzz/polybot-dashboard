import {redirect} from "next/navigation";
import {verifyAuth, verifyToken} from "@/lib/auth/auth";
export default async function DashboardHome() {
    const result = await verifyAuth()

    if (!result.user || !result.session) {
        return redirect('/');
    }

    const discordUser = await verifyToken(result.session)
    console.log(discordUser)

    if (!discordUser.id) {
        return redirect('/');
    }

    return <>
        <p>Dashboard</p>
    </>
}