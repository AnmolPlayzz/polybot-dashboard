import styles from './details-layout.module.css'
import LeftServerNav from "@/components/server-navigation/left-server-nav";
import {useContext} from "react";
import {ServersContext} from "@/contexts/servers-context";

export default async function ServerLayout({children, params}: {
    children: React.ReactNode,
    params: {
        id: string
    }
}) {
    return <>
        <div className={styles.leftServerNav}>
            <LeftServerNav/>
        </div>
        <main className={styles.mainContent}>
            {children}
        </main>
    </>

}