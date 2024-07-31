"use client"
import styles from "./left-server-nav.module.css"
import {useContext} from "react";
import {ServersContext} from "@/contexts/servers-context";
import {usePathname} from "next/navigation";
import ServerPicker from "@/components/server-navigation/server-picker";
import CategoryLink from "@/components/server-navigation/category-link";
const links = [
    {
        category: "The Basics",
        links: [
            {
                name: "Home",
                path: "home",
                icon: "/icons/app/server-category/home",
            }
        ]
    },
    {
        category: "Modules",
        links: [
            {
                name: "Welcome",
                path: "welcome-module",
                icon: "/icons/app/server-category/welcome"
            },
            {
                name: "AutoRole",
                path: "autorole-module",
                icon: "/icons/app/server-category/autorole"
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
            <div className={styles.panelLinksContainer}>
                {links.map(category => {
                    return <div key={category.category} className={styles.categoryHead}>
                        <p className={styles.categoryName}>
                            {category.category}
                        </p>
                        <div className={styles.categoryLinks}>
                            {category.links.map(link => {
                                return <CategoryLink icon={link.icon} href={link.path} key={link.path}>
                                    {link.name}
                                </CategoryLink>
                            })}
                        </div>
                    </div>
                })}
            </div>
        </div>
    }
}