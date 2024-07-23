import styles from "./nav-list.module.css"
import {logout} from "@/lib/auth-actions";
export default function NavList({username} : {
    username: string,
}) {
    return <>
        <div className={styles.navList}>
            <p className={styles.username}>
                {username}
            </p>

            <form action={logout} className={styles.form}>
                <button className={`${styles.button} ${styles.logout}`}>Log Out</button>
            </form>
        </div>
    </>

}