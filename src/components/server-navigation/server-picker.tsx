"use client"
import styles from "./server-picker.module.css"
import {useContext, useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {CurrentServerContext} from "@/contexts/current-server-context";

function getInitials(txt: string): string {
    const list : string[] = txt.split(" ")
    const mapped = list.map((text: string) => text.at(0))
    return mapped.join("")
}

export default function ServerPicker({servers, id}: {
    servers: {
        id: string,
        name: string,
        icon_url: string | null
    }[],
    id: string
}) {
    const {id : currentId, setCurrent} = useContext(CurrentServerContext);
    const [selectorOpen, setSelectorOpen] = useState<boolean>(false)
    const [currentServer, setCurrentServer] = useState<any>(null);
    useEffect(() => {
        setCurrent(id)
        setCurrentServer(servers.filter(server => server.id === currentId)[0])
    }, [servers, currentId, id, setCurrent]);
    if (servers.length === 0 || currentServer===null || currentServer===undefined) {
        return null
    }

    return <div className={styles.headContainer}>
        <div className={styles.currentServer} onClick={() => setSelectorOpen(val => !val)}>
            <div className={styles.imageContainer}>{currentServer.icon_url ?
                <>
                    <Image className={styles.blurImage} src={currentServer.icon_url} alt={currentServer.name} width={80}
                           height={80}/>
                    <Image className={styles.topImage} src={currentServer.icon_url} alt={currentServer.name} width={30}
                     height={30}/>
                </>: <p className={styles.noIcon}>{getInitials(currentServer.name)}</p>
            }</div>
            <div className={styles.serverName}>
                {currentServer.name}
            </div>
            <Image className={selectorOpen ? `${styles.expandImage} ${styles.open}` : styles.expandImage} src="/icons/app/server-nav/expand-arrow.svg" alt="expand arrow" width={16} height={16}/>
        </div>
        {selectorOpen && <div className={styles.serverList}>
            {servers.filter(server => server.id !== currentServer.id).map(server => {
                return <Link href={`/app/${server.id}`} key={server.id} className={styles.link} onClick={() => setSelectorOpen(false)}>
                    <div className={styles.imageContainer}>{server.icon_url ?
                        <>
                            <Image className={styles.blurImage} src={server.icon_url} alt={currentServer.name}
                                   width={80}
                                   height={80}/>
                            <Image className={styles.topImage} src={server.icon_url} alt={currentServer.name} width={30}
                                   height={30}/>
                        </> : <p className={styles.noIcon}>{getInitials(server.name)}</p>
                    }</div>
                    <p className={styles.serverListName}>
                        {server.name}
                    </p>
                </Link>
            })}
            <a style={{
                color: "white",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                boxSizing: "border-box"
            }} href="https://discord.com/oauth2/authorize?client_id=1111870769027371094&permissions=8&integration_type=0&scope=bot+applications.commands"
               className={styles.link}
                target="_blank"
            >
                + Add to another server
            </a>
        </div>}
    </div>
}