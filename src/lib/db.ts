import 'server-only'
import { neon } from "@neondatabase/serverless";
const dbUrl: string = process.env.DATABASE_URL || ""
if (!dbUrl) {
    throw new Error("Missing database URL");
}

export const sql = neon(dbUrl);

