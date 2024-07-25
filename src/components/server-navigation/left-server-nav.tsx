"use client"
import styles from "./left-server-nav.module.css"
import {useContext} from "react";
import {ServersContext} from "@/contexts/servers-context";
import {usePathname} from "next/navigation";
import ServerPicker from "@/components/server-navigation/server-picker";
const links = [
    {
        category: "",
        links: [
            {
                name: "Home",
                path: "",
                image: "",
            }
        ]
    }
]
export default function LeftServerNav() {
    const path = usePathname()
    const servers = useContext(ServersContext)
    if(path==="/app") {
        return <p className={styles.noServer}>
            No server selected.
        </p>
    }
    if(path.split("/")[2]) {
        const id = path.split("/")[2]
        return <div className={styles.serverSideBar}>
            <ServerPicker servers={servers} id={id} />
        </div>
    }
}