import styles from './home.module.css';
import HomeStats from "@/components/server-details/home/home-stats";
import {Suspense} from "react";
import Image from "next/image";
import Loader from "@/components/utils/loader";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Server Home | PolyBot Dashboard",
};

export default async function ServerHome({params}: {
    params: {
        id: string;
    }
}) {

    return <div className={styles.serverHome}>
        <Suspense fallback={<Loader>
            Loading server stats...
        </Loader>}>
            <HomeStats id={params.id}/>
        </Suspense>
    </div>
}