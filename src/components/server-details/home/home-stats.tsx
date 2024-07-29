import styles from "./home-stats.module.css";
import {getServerStats} from "@/lib/app/server";
import Image from "next/image";

function getInitials(txt: string): string {
    const list : string[] = txt.split(" ")
    const mapped = list.map((text: string) => text.at(0))
    return mapped.join("")
}

function parseNumber(value: number): string {
    if (value >= 1_000 && value < 1_000_000) {
        return String(Math.floor(value/1000))+" K"
    } else if (value >= 1_000_000 && value < 1_000_000_000) {
        return String(Math.floor(value/1_000_000))+" M"
    } else {
        return String(value)
    }
}

export default async function HomeStats({id}: {
    id: string;
}) {
    const data = await getServerStats(id);
    return <div className={styles.serverDetailsContainer}>
        <div className={styles.imageContainer}>{data.iconUrl ?
            <>
                <Image src={data.iconUrl} alt={data.name} className={styles.blurImage} width={250} height={250} quality={50}
                       priority={true}/>
                <Image src={data.iconUrl} alt={data.name} className={styles.image} width={120} height={120}
                       priority={true}/>
            </> :
            <p className={styles.noIcon}>
                {getInitials(data.name)}
            </p>
        }</div>
        <div className={styles.statsContainer}>
            <p className={styles.serverName}>
                {data.name}
            </p>
            <div className={styles.serverStats}>
                <div className={styles.stat}>
                    <p className={styles.statName}>
                        Members
                    </p>
                    <p className={styles.statValue}>
                        {parseNumber(data.memberCount)}
                    </p>
                </div>
                <div className={styles.stat}>
                    <p className={styles.statName}>
                        Bots
                    </p>
                    <p className={styles.statValue}>
                        {parseNumber(data.botCount)}
                    </p>
                </div>
                <div className={styles.stat}>
                    <p className={styles.statName}>
                        Roles
                    </p>
                    <p className={styles.statValue}>
                        {parseNumber(data.roleCount)}
                    </p>
                </div>
                <div className={styles.stat}>
                    <p className={styles.statName}>
                        Channels
                    </p>
                    <p className={styles.statValue}>
                        {parseNumber(data.channelCount)}
                    </p>
                </div>
            </div>
        </div>
    </div>
}