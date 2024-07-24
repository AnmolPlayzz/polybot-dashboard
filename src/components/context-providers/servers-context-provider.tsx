"use client"
import {ServersContext} from "@/contexts/servers-context";
export default function ServersContextProvider({children, servers}: {
    children: React.ReactNode,
    servers: {
        id: string,
        name: string,
        icon_url: string | null
    }[]
}) {
    return <ServersContext.Provider value={servers}>
        {children}
    </ServersContext.Provider>
}