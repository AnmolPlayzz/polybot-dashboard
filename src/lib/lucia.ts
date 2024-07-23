import 'server-only'
import { Lucia } from "lucia";
import { NeonHTTPAdapter } from "@lucia-auth/adapter-postgresql";
import { sql } from "@/lib/db";

const adapter = new NeonHTTPAdapter(sql, {
    user: "auth_user",
    session: "user_session",
});


export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes: any) => {
        return {
            name: attributes.name,
            username: attributes.username
        };
    }
});

interface DatabaseUserAttributes {
    name: string;
    username: string;
}
