import { createContext } from "react";

export const UserContext = createContext<{
    sessionId: string,
    discordId: string,
    username: string | null,
    globalName: string | null,
    avatarUrl: string | null
}>({
    sessionId: "",
    discordId: "",
    username: "",
    globalName: "",
    avatarUrl: ""
})