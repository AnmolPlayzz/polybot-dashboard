"use server"

import {cookies} from "next/headers";
import {lucia} from "@/lib/lucia";
import mongoClient from "@/lib/app/mongo";
import {fetchWelcome} from "@/lib/app/modules/welcome";
import {revalidatePath} from "next/cache";
import {fetchServers} from "@/lib/app/server";
import {notFound, redirect} from "next/navigation";

export async function updateWelcome(_: any, formData: any): Promise<{
    [k: string]: any;
} | undefined> {
    const data = {
        status: formData.get("welcome"),
        welcomeID: formData.get("welcomeID"),
        leaveID: formData.get("leaveID"),
        id: formData.get("server")
    }

    const errors: string[] = []

    const session = cookies().get(lucia.sessionCookieName)
    if (!session) {
        redirect("/")
        return;
    }
    let fetched;
    try {
        fetched = await fetchServers(session.value)
    } catch (e) {
        notFound();
        return;
    }
    const server = fetched.filter(srv => srv.id === data.id)[0];
    if (!server) {
        errors.push("You are not authorized to make changes on this server.")
        return;
    }

    try {
        const db = mongoClient.db("polybot");
        const collection = db.collection('welcome');
        if(data.status === null) {
            await collection.deleteMany({ guildID: data.id })
            console.log("deleted")
        } else if (data.status === "on") {
            const dataRes = await fetchWelcome(data.id);
            if (data.welcomeID.length === 0 || !data.welcomeID) {
                errors.push("No welcome channel selected");
            }
            if (data.leaveID.length === 0 || !data.leaveID) {
                errors.push("No leave channel selected");
            }
            if (errors.length>0) {
                return {
                    errors
                }
            }
            if (dataRes.response) {
                await collection.updateOne({ guildID: data.id }, { $set:
                    {
                        welcomeID: data.welcomeID,
                        leaveID: data.leaveID,
                    } });
            } else if (!dataRes.response && !dataRes.error ) {
                await collection.insertOne({
                    welcomeID: data.welcomeID,
                    leaveID: data.welcomeID,
                    guildID: data.id
                })
            }
        }
        revalidatePath(`/app/${data.id}/welcome-module`);
    } catch (e) {
        errors.push("Internal server error. Try Again Later!")
    }
    if (errors.length>0) {
        return {
            errors
        }
    }
}