import 'server-only'
import {cookies} from "next/headers";
import {lucia} from "@/lib/lucia";
import {User, Session} from "lucia";
import { sql } from "@/lib/db";
import {redirect} from "next/navigation";

export async function verifyAuth(): Promise<{
    user: User | null,
    session: Session | null
}> {
    const session = cookies().get(lucia.sessionCookieName)
    if (!session) {
        return {
            user: null,
            session: null
        }
    }
    const sessionId = session.value;
    if (!sessionId) {
        return {
            user: null,
            session: null
        }
    }

    const res = await lucia.validateSession(sessionId)

    try {
        if (res.session && res.session.fresh) {
            const sessionCookie: any = lucia.createSessionCookie(res.session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!res.session) {
            const sessionCookie: any = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch {}

    return res
}
export async function verifyToken(sessionId: Session): Promise<{
    id: string | null,
    username: string | null,
    global_name: string | null,
    avatar_url: string | null
}> {
    const res = await sql `SELECT * FROM discord_token WHERE session_id = ${sessionId.id}`;
    if (res[0]) {
        const token = res[0].init_token;
        const response = await fetch("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            await sql `DELETE FROM discord_token WHERE session_id = ${sessionId.id}`;
            return {
                id: null,
                username: null,
                global_name: null,
                avatar_url: null
            }
        }
        const data = await response.json();
        return {
            id: data.id,
            username: data.username,
            global_name: data.global_name,
            avatar_url: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.webp?size=4096`
        }
    } else {
        return {
            id: null,
            username: null,
            global_name: null,
            avatar_url: null
        }
    }
}

export async function destroySession() {
    const { session } = await verifyAuth()
    if (!session) {
        return {
            error: "Unauthorized"
        }
    }
    await lucia.invalidateSession(session.id)
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}