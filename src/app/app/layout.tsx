import NavBar from "@/components/nav-bar";
import {verifyAuth, verifyToken} from "@/lib/auth/auth";
import {redirect} from "next/navigation";
import UserContextProvider from "@/components/context-providers/user-context-provider";
export default async function DashboardLayout({children, left_panel}: {children: React.ReactNode, left_panel: React.ReactNode}) {
    const result = await verifyAuth()
    if (!result.user || !result.session) {
        return redirect('/');
    }
    const discordUser = await verifyToken(result.session)
    if (!discordUser.id) {
        return redirect('/');
    }

    return <>
        <NavBar username={discordUser.username || ""} iconUrl={discordUser.avatar_url || "/images/landing.png"}>
            {left_panel}
        </NavBar>
        <UserContextProvider
            sessionId={result.session.id}
            discordId={discordUser.id}
            username={discordUser.username}
            globalName={discordUser.global_name}
            avatarUrl={discordUser.avatar_url}
        >
            {children}
        </UserContextProvider>
    </>
}