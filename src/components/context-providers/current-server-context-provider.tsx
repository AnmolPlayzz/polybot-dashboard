"use client"
import { CurrentServerContext } from "@/contexts/current-server-context";
import {useState} from "react";

export default function CurrentServerContextProvider({children}: {
    children: React.ReactNode,
}) {
    const [currentServer, setCurrentServer] = useState("");
    return <CurrentServerContext.Provider value={{
        id: currentServer,
        setCurrent: setCurrentServer,
    }}>
        {children}
    </CurrentServerContext.Provider>
}