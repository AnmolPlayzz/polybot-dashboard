import styles from "./loader.module.css"

export default function Loader({children}: {children: React.ReactNode}) {
    return <div className={styles.loadingHead}>
        <p className={styles.loadingText}>
            {children}
        </p>
        <div className={styles.loadingContainer}>
            <div className={styles.loading}>
            </div>
        </div>
    </div>
}