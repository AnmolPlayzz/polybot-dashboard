import { createContext } from "react";

export const CurrentServerContext = createContext<{
    id: string,
    setCurrent: (id: any) => void,
}>({
    id: "",
    setCurrent: (id: any) => {},
})