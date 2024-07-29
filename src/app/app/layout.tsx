import NavBar from "@/components/nav-bar";
import {verifyAuth, verifyToken} from "@/lib/auth/auth";
import {redirect} from "next/navigation";
import UserContextProvider from "@/components/context-providers/user-context-provider";
import {fetchServers} from "@/lib/app/server";
import ServersContextProvider from "@/components/context-providers/servers-context-provider";
import LeftServerNav from "@/components/server-navigation/left-server-nav";
import CurrentServerContextProvider from "@/components/context-providers/current-server-context-provider";
import type {Metadata} from "next";
export const metadata: Metadata = {
    title: "Select a server | PolyBot Dashboard",
};
export default async function DashboardLayout({children}: {children: React.ReactNode}) {
    const result = await verifyAuth()
    if (!result.user || !result.session) {
        return redirect('/');
    }
    const discordUser = await verifyToken(result.session)
    if (!discordUser.id) {
        return redirect('/');
    }

    const data = await fetchServers(result.session.id)
    return <>

        <ServersContextProvider servers={data}>
            <UserContextProvider
                sessionId={result.session.id}
                discordId={discordUser.id}
                username={discordUser.username}
                globalName={discordUser.global_name}
                avatarUrl={discordUser.avatar_url}
            >
                <CurrentServerContextProvider>
                    <NavBar username={discordUser.username || ""} iconUrl={discordUser.avatar_url || "/images/landing.png"}>
                        <LeftServerNav/>
                    </NavBar>
                    {children}
                </CurrentServerContextProvider>
            </UserContextProvider>
        </ServersContextProvider>
    </>
}