import { generateState } from "arctic";
import { discord } from "@/lib/auth/discord";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
    const state : any = generateState();
    const url : URL = await discord.createAuthorizationURL(state, {
        scopes: ["identify","guilds"]
    });
    const stateVar: any = "discord_oauth_state"
    const config: any = {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    }

    cookies().set(stateVar, state, config );

    return Response.redirect(url);
}
