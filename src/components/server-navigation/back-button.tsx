import styles from "./back-button.module.css"
import {usePathname} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function BackButton() {
    const path = usePathname()
    const list = path.split("/")
    if (list.length >= 3 && list[1]==="app") {
        return <Link href={`/app`} className={styles.backButton} >
            <Image className={styles.backIcon} src="/icons/nav-bar/back-arrow.svg" alt="back arrow" width={18} height={18} />
        </Link>
    }
}