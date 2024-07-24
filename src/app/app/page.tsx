import {cookies} from "next/headers";
import styles from "./page.module.css"
import Image from "next/image";
import {lucia} from "@/lib/lucia";
import {fetchServers} from "@/lib/app/server";
import Link from "next/link";
import {MdAdd} from "react-icons/md";
export default async function DashboardHome() {
    const session = cookies().get(lucia.sessionCookieName)
    if (!session) {
        return null
    }
    const data = await fetchServers(session.value)
    console.log(data)
    function getInitials(txt: string): string {
        const list : string[] = txt.split(" ")
        const mapped = list.map((text: string) => text.at(0))
        return mapped.join("")
    }

    return <>
        <main className={styles.dashboardMain}>
            <h1 className={styles.selectServerHead}>
                Select a Server
            </h1>
            <div className={styles.mainContainer}>
                <div className={styles.selectServerMain}>
                    {data.length > 0 ? data.map((server) => (
                        <Link href={`/app/${server.id}`} className={styles.server} key={server.id}>
                            <div className={styles.imageContainer}>
                                {server.icon_url ? (
                                    <>
                                        <Image className={styles.blurImage} src={server.icon_url} alt={server.name}
                                               width={90} height={90}/>
                                        <Image className={styles.mainImage} src={server.icon_url} alt={server.name}
                                               width={50} height={50}/>
                                    </>
                                ) : <p className={styles.noIcon}>
                                    {getInitials(server.name)}
                                </p>}
                            </div>
                            <p className={styles.serverName}>
                                {server.name}
                            </p>
                            <Image src="/icons/app/server/arrow.svg" alt="edit server" width={20} height={20}/>
                        </Link>
                    )) : <p className={styles.noServer}>
                        PolyBot is not in any server where you have the &apos;Manage
                        Guild&apos; or &apos;Administrator&apos; permission.
                        <br/>
                        <br/>
                        If you just added the bot to your server, please wait a few second and refresh the page.
                    </p>}
                </div>
                <a href="https://discord.com/oauth2/authorize?client_id=1111870769027371094&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" className={styles.addBot}>
                    <MdAdd className={styles.addIcon} />
                    Invite PolyBot
                </a>
            </div>

        </main>
    </>
}