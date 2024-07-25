"use server"
import "server-only"
import {sql} from "@/lib/db";
const token:string | undefined = process.env.TOKEN;
if (!token) {
    throw new Error("No discord token provided.")
}

const Permissions: {[permission: string]: number} = {
    CREATE_INSTANT_INVITE: 1 << 0,
    KICK_MEMBERS: 1 << 1,
    BAN_MEMBERS: 1 << 2,
    ADMINISTRATOR: 1 << 3,
    MANAGE_CHANNELS: 1 << 4,
    MANAGE_GUILD: 1 << 5,
    ADD_REACTIONS: 1 << 6,
    VIEW_AUDIT_LOG: 1 << 7,
    PRIORITY_SPEAKER: 1 << 8,
    STREAM: 1 << 9,
    VIEW_CHANNEL: 1 << 10,
    SEND_MESSAGES: 1 << 11,
    SEND_TTS_MESSAGES: 1 << 12,
    MANAGE_MESSAGES: 1 << 13,
    EMBED_LINKS: 1 << 14,
    ATTACH_FILES: 1 << 15,
    READ_MESSAGE_HISTORY: 1 << 16,
    MENTION_EVERYONE: 1 << 17,
    USE_EXTERNAL_EMOJIS: 1 << 18,
    VIEW_GUILD_INSIGHTS: 1 << 19,
    CONNECT: 1 << 20,
    SPEAK: 1 << 21,
    MUTE_MEMBERS: 1 << 22,
    DEAFEN_MEMBERS: 1 << 23,
    MOVE_MEMBERS: 1 << 24,
    USE_VAD: 1 << 25,
    CHANGE_NICKNAME: 1 << 26,
    MANAGE_NICKNAMES: 1 << 27,
    MANAGE_ROLES: 1 << 28,
    MANAGE_WEBHOOKS: 1 << 29,
    MANAGE_EMOJIS_AND_STICKERS: 1 << 30,
    USE_APPLICATION_COMMANDS: 1 << 31,
    REQUEST_TO_SPEAK: 1 << 32,
    MANAGE_THREADS: 1 << 34,
    CREATE_PUBLIC_THREADS: 1 << 35,
    CREATE_PRIVATE_THREADS: 1 << 36,
    USE_EXTERNAL_STICKERS: 1 << 37,
    SEND_MESSAGES_IN_THREADS: 1 << 38,
    USE_EMBEDDED_ACTIVITIES: 1 << 39,
    MODERATE_MEMBERS: 1 << 40,
};

function hasPermission(permissionNumber: number, permission: string) {
    return (permissionNumber & Permissions[permission]) === Permissions[permission];
}

export async function fetchServers(sessionId?:string): Promise<{
    id: string,
    name: string,
    icon_url: string | null
}[]> {

    const botServersFetch = await fetch("https://discord.com/api/v10/users/@me/guilds", {
        headers: {
            "Authorization": `Bot ${token}`
        },
        next: {
            revalidate:5
        }
    })
    if (!botServersFetch.ok) {
        throw new Error("No botServers found.")
    }
    const botServers = await botServersFetch.json()
    const tokenData = await sql`SELECT init_token FROM discord_token WHERE session_id=${sessionId}`
    const discordToken = tokenData[0].init_token;
    if (!discordToken) {
        throw new Error("No discord token found.")
    }
    const userServerData = await fetch("https://discord.com/api/v10/users/@me/guilds", {
        headers: {
            "Authorization": `Bearer ${discordToken}`
        },
        next: {
            revalidate:5
        }
    })
    if (!userServerData.ok) {
        throw new Error("No user server found.")
    }
    const userServers = await userServerData.json()
    function intersection (a: any, b: any) {
        const idsArray2 = new Set(b.map((item: any) => item.id));
        const commonElements = a.filter((item: any) => idsArray2.has(item.id));
        return commonElements
    }
    const commonServers = intersection(userServers,botServers);
    const permittedServers = commonServers.filter((server: {[prop: string]: null|string|boolean}) => {
        return hasPermission(Number(server.permissions), "MANAGE_GUILD") || hasPermission(Number(server.permissions), "ADMINISTRATOR");
    })
    return permittedServers.map((data: any) => {
        return {
            id: data.id,
            name: data.name,
            icon_url: data.icon ? `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.webp?size=1024&format=webp` : null,
        }
    })
}