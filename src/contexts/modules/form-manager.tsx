//To manage saving and resetting
import { createContext } from "react";

export const FormManager = createContext<{
    data: any;
    setData: any
}>({
    data: null,
    setData: (data: any) => {}
})