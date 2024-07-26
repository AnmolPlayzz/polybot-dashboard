import styles from './home.module.css';
import HomeStats from "@/components/server-details/home/home-stats";
import {Suspense} from "react";
import Image from "next/image";

export default async function ServerHome({params}: {
    params: {
        id: string;
    }
}) {

    return <div className={styles.serverHome}>
        <Suspense fallback={
            <>
                <p className={styles.loadingText}>
                    Loading Server Stats...
                </p>
                <div className={styles.loadingContainer}>
                    <div className={styles.loading}>

                    </div>
                </div>
            </>
        }>
            <HomeStats id={params.id}/>
        </Suspense>
    </div>
}