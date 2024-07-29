import styles from './details-layout.module.css'
import LeftServerNav from "@/components/server-navigation/left-server-nav";
import {cookies} from "next/headers";
import {lucia} from "@/lib/lucia";
import {fetchServers} from "@/lib/app/server";
import {notFound} from "next/navigation";
import {Suspense} from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Server Details | PolyBot Dashboard",
};

export default async function ServerLayout({children, params}: {
    children: React.ReactNode,
    params: {
        id: string
    }
}) {
    const id = params.id
    const session = cookies().get(lucia.sessionCookieName)
    if (!session) {
        return null
    }
    let data;
    try {
        data = await fetchServers(session.value)
    } catch (e) {
        notFound();
    }
    const server = data.filter(srv => srv.id === id)[0];
    if (!server) {
        notFound();
    }
    return <>
        <div className={styles.leftServerNav}>
            <LeftServerNav/>
        </div>
        <main className={styles.mainContent}>
            {children}
        </main>
    </>

}