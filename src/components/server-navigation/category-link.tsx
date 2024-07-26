"use client"
import styles from "./category-link.module.css"
import {usePathname} from "next/navigation";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import Image from "next/image";

export default function CategoryLink({href, children, icon}: {
    href: string,
    children: React.ReactNode,
    icon: string,
}) {
    const [active, setActive] = useState(false);
    const path = usePathname()
    useEffect(() => {
        const pathList = path.split("/")
        if (pathList[3]) {
            if (pathList[3].startsWith(href)) {
                setActive(true)
            } else {
                setActive(false)
            }
        }
    }, [path]);

    return (
        <Link href={href} className={active ? `${styles.categoryLink} ${styles.active}` : styles.categoryLink}>
        <div className={styles.iconContainer}>
            <Image className={styles.iconColored} src={icon + "-colored.svg"} alt={icon} width={22} height={22} />
            <Image className={styles.icon} src={icon + ".svg"} alt={icon} width={22} height={22} />
        </div>
        <p className={styles.name}>{children}</p>
        </Link>
    )
}