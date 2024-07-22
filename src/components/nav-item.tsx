"use client"
import styles from "@/components/nav-item.module.css";
import Image from "next/image";
import {useState} from "react";
import NavList from "@/components/nav-list";

export default function NavItems({ iconUrl }: { iconUrl: string }) {
    const [menuState, setMenuState] = useState(false)

    function handleClick() {
        setMenuState((prevState) => !prevState);
    }

    return <div className={styles.rightNav}>
        <Image className={styles.rightAvatarImage} src={iconUrl} alt={"user avatar"} width={40} height={40} priority={true} onClick={handleClick} />
        {menuState && <NavList />}
    </div>
}