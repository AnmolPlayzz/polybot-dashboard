import styles from "./nav-bar.module.css"
import Image from "next/image";
import NavItems from "@/components/nav-item";

export default function NavBar({iconUrl}: {iconUrl: string}) {
    return <nav className={styles.navBar}>
        <div className={styles.largeNav}>
            <div className={styles.leftHeader}>
                <Image className={styles.leftHeaderImage} src="/images/landing.png" alt={"bot icon"} width={40} height={40} priority={true} />
                <div className={styles.leftHeaderBar}></div>
                <h2 className={styles.leftHeaderTitle}>Dashboard</h2>
            </div>
            <div className={styles.centreLinks}>
                <a href="https://polybot-website.vercel.app/" target="_blank" className={styles.link}>
                    <Image className={styles.image} src="/icons/nav-bar/redirect.svg" alt="redirect" width={18} height={18} priority={true}/>
                    Website
                </a>
                <a href="https://github.com/AnmolPlayzz/PolyBot" target="_blank" className={styles.link}>
                    <Image className={styles.image} src="/icons/nav-bar/github.svg" alt="redirect" width={18} height={18} priority={true}/>
                    GitHub
                </a>
            </div>
            <NavItems iconUrl={iconUrl} />
        </div>
    </nav>
}