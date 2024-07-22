import { Discord } from "arctic";

const clientId:string= process.env.CLIENT_ID || "";
const clientSecret:string = process.env.CLIENT_SECRET || "";
const redirectUrl:string = process.env.REDIRECT_URL || "http://localhost:3000";
export const discord: Discord = new Discord(clientId, clientSecret, `${redirectUrl}/api/auth/callback`);
