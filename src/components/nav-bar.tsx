import styles from "./nav-bar.module.css"
import Image from "next/image";
import NavItems from "@/components/nav-item";
import LeftMenu from "@/components/left-menu";
import NavList from "@/components/nav-list";
import React from "react";
import Link from "next/link";

export default function NavBar({children, iconUrl, username}: {children: React.ReactNode,iconUrl: string, username: string}) {
    return <nav className={styles.navBar}>
        <div className={styles.largeNav}>
            <div className={styles.leftHeader}>
                <LeftMenu>
                    {children}
                </LeftMenu>
                <Link href="/app">
                    <Image className={styles.leftHeaderImage} src="/images/landing.png" alt={"bot icon"} width={40} height={40} priority={true} />
                </Link>
                <div className={styles.leftHeaderBar}></div>
                <h2 className={styles.leftHeaderTitle}>Dashboard</h2>
            </div>
            <div className={styles.centreLinks}>
                <a href="https://polybot-website.vercel.app/" target="_blank" className={styles.cenlink}>
                    <Image className={styles.image} src="/icons/nav-bar/redirect.svg" alt="redirect" width={18} height={18} priority={true}/>
                    Website
                </a>
                <a href="https://github.com/AnmolPlayzz/PolyBot" target="_blank" className={styles.cenlink}>
                    <Image className={styles.image} src="/icons/nav-bar/github.svg" alt="redirect" width={18} height={18} priority={true}/>
                    GitHub
                </a>
            </div>
            <NavItems iconUrl={iconUrl}>
                <NavList username={username} />
            </NavItems>
        </div>
    </nav>
}