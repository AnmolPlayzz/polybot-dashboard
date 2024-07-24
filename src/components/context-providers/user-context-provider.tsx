"use client"
import {UserContext} from "@/contexts/user-context";

export default function UserContextProvider({children, sessionId, discordId, avatarUrl, globalName, username}: {
    children: React.ReactNode,
    sessionId: string,
    discordId: string,
    username: string | null,
    globalName: string | null,
    avatarUrl: string | null
}) {
    return <UserContext.Provider value={{
        sessionId, discordId, avatarUrl, globalName, username
    }}>
        {children}
    </UserContext.Provider>
}