import NavBar from "@/components/nav-bar";
import {verifyAuth, verifyToken} from "@/lib/auth/auth";
import {redirect} from "next/navigation";

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
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
        <NavBar iconUrl={discordUser.avatar_url || "/images/landing.png"} />
        {children}
    </>
}