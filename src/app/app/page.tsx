import {redirect} from "next/navigation";
import {verifyAuth, verifyToken} from "@/lib/auth/auth";
import styles from "./page.module.css"
import Image from "next/image";
export default async function DashboardHome() {
    const result = await verifyAuth()

    if (!result.user || !result.session) {
        return redirect('/');
    }

    const discordUser = await verifyToken(result.session)
    console.log(discordUser)

    if (!discordUser.id) {
        return redirect('/');
    }

    return <>
        <main className={styles.dashboardMain}>
            <div className={styles.tempDetails}>
                <p>{discordUser.id}</p>
                <Image src={discordUser.avatar_url || "https://cdn.discordapp.com/avatars/1111870769027371094/d678d4e7b9eefc9206b1be8b6dac5a34.webp?size=4096"} alt={"user avatar"} width={200} height={200}/>
                <p>{discordUser.global_name}</p>
                <p>{discordUser.username}</p>
            </div>
        </main>
    </>
}