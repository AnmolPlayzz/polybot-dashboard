import styles from "./warning.module.css"
import {MdInfo} from "react-icons/md";
export default function Warning({children}: {children: React.ReactNode}) {
    return <div className={styles.warning}>
        <div className={styles.header}>
            <MdInfo className={styles.icon} />
            WARNING
        </div>
        {children}
    </div>
}