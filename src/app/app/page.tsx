import {redirect} from "next/navigation";
import {verifyAuth, verifyToken} from "@/lib/auth/auth";
import styles from "./page.module.css"
import Image from "next/image";
export default async function DashboardHome() {
    return <>
        <main className={styles.dashboardMain}>
        </main>
    </>
}