import styles from "./nav-list.module.css"
import {logout} from "@/lib/auth-actions";
export default function NavList() {

    return <div className={styles.navList}>
        <form action={logout} className={styles.form}>
            <button className={`${styles.button} ${styles.logout}`}>Log Out</button>
        </form>
    </div>
}