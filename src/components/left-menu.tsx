"use client"
import styles from "./left-menu.module.css"
import Image from "next/image";
import React, {useContext, useEffect, useState} from "react";
import {CurrentServerContext} from "@/contexts/current-server-context";
import BackButton from "@/components/server-navigation/back-button";
import {usePathname} from "next/navigation";
export default function LeftMenu({children}: {children: React.ReactNode}) {
    const [openState, setOpenState] = useState(false);
    const {id, setCurrent} = useContext(CurrentServerContext)
    const path = usePathname()
    useEffect(() => {
        setOpenState(false)
    }, [id, path]);
    return <>
        <BackButton />
        <button onClick={() => setOpenState((val) => !val)}
                className={openState ? `${styles.leftMenuButton} ${styles.active}` : styles.leftMenuButton}>
            <Image className={styles.crossIcon} src="/icons/nav-bar/cross.svg" alt="cross icon" width={16} height={16}
                   priority={true}/>
            <Image className={styles.menuIcon} src="/icons/nav-bar/menu.svg" alt="menu icon" width={16} height={16}
                   priority={true}/>
        </button>
        <div className={openState ? `${styles.leftPane} ${styles.panelActive}` : styles.leftPane}>
            {children}
            <div className={styles.outboundLinks}>
                <a href="https://polybot-website.vercel.app/" target="_blank" className={styles.link}>
                    <Image className={styles.image} src="/icons/nav-bar/redirect.svg" alt="redirect" width={18}
                           height={18} priority={true}/>
                    Website
                </a>
                <a href="https://github.com/AnmolPlayzz/PolyBot" target="_blank" className={styles.link}>
                    <Image className={styles.image} src="/icons/nav-bar/github.svg" alt="redirect" width={18}
                           height={18} priority={true}/>
                    GitHub
                </a>
            </div>
        </div>
        <div className={ openState ? `${styles.bg} ${styles.panelActive}` :styles.bg}></div>
    </>
}