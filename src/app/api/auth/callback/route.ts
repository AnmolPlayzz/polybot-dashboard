import { discord } from "@/lib/auth/discord";
import { lucia } from "@/lib/lucia";
import { sql } from "@/lib/db";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { DiscordTokens } from "arctic";
export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("discord_oauth_state")?.value ?? null;
    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }
    try {
        const tokens: DiscordTokens = await discord.validateAuthorizationCode(code);
        const response = await fetch("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        const discordUser = await response.json();
        const existingUser = await sql`SELECT * FROM auth_user WHERE discord_id = ${discordUser.id}`
        console.log(existingUser)
        if (existingUser) {
            const session = await lucia.createSession(existingUser[0].id, {});
            const sessionCookie: any = lucia.createSessionCookie(session.id)
            const data = await sql`SELECT * FROM discord_token WHERE init_token=${tokens.accessToken}`
            if (data[0]) {
                await sql`UPDATE discord_token SET session_id = ${session.id}, refresh_token = ${tokens.refreshToken}, expires_at = ${tokens.accessTokenExpiresAt} WHERE init_token = ${tokens.accessToken}`
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
                return new Response(null, {
                    status: 302,
                    headers: {
                        Location: "/app"
                    }
                });
            }
            await sql`INSERT INTO discord_token VALUES(${session.id},${tokens.accessToken},${tokens.refreshToken},${tokens.accessTokenExpiresAt})`
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/app"
                }
            });
        }

        const userId = generateIdFromEntropySize(10)
        await sql`INSERT INTO auth_user(id, discord_id) VALUES (${userId},${discordUser.id})`

        const session = await lucia.createSession(userId, {});
        const sessionCookie: any = lucia.createSessionCookie(session.id);
        await sql`INSERT INTO discord_token VALUES(${session.id},${tokens.accessToken},${tokens.refreshToken},${tokens.accessTokenExpiresAt})`
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/app"
            }
        });

    } catch (e) {
        console.log(e)
    }
}