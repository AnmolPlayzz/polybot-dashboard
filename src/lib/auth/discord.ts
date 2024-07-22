import { Discord } from "arctic";

const clientId:string= process.env.CLIENT_ID || "";
const clientSecret:string = process.env.CLIENT_SECRET || "";

export const discord: Discord = new Discord(clientId, clientSecret, "http://localhost:3000/api/auth/callback");
