import { createContext } from "react";

export const ServersContext = createContext<{
    id: string,
    name: string,
    icon_url: string | null
}[]>([])