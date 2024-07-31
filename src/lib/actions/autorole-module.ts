"use server"

import {cookies} from "next/headers";
import {lucia} from "@/lib/lucia";
import mongoClient from "@/lib/app/mongo";
import {fetchAutoRole} from "@/lib/app/modules/autorole";
import {revalidatePath} from "next/cache";
import {fetchServers} from "@/lib/app/server";
import {notFound, redirect} from "next/navigation";
export async function updateAutoRole(_: any, formData: any): Promise<{
    [k: string]: any;
} | undefined> {
    const id = formData.get("server");
    const roles = formData.get("roleList")
    const status = formData.get("autorole");
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
    const server = fetched.filter(srv => srv.id === id)[0];
    if (!server) {
        errors.push("You are not authorized to make changes on this server.")
        return;
    }

    try {
        const db = mongoClient.db("polybot");
        const collection = db.collection('autorole');
        if(status === null) {
            await collection.deleteMany({ guildID: id })
        } else if (status==='on') {
            const dataRes = await fetchAutoRole(id);
            const roleList = roles.split(",")
            const check = roleList.filter((role: string): boolean=> isNaN(Number(role)));
            if (check.length > 0) {
                errors.push("You are trying to modify the DOM to send invalid data.")
            }
            if (roleList.length === 0 || roles.length === 0) {
                errors.push("Please select at least one role.")
            }
            if (errors.length>5) {
                errors.push("You can only select 5 roles at max.")
            }
            if (errors.length>0) {
                return {
                    errors
                }
            }
            console.log(dataRes)
            if (dataRes.response) {
                await collection.updateOne({ guildID: id }, { $set:
                        {
                            roleList: roleList
                        }
                });
            } else if (!dataRes.response && !dataRes.error ) {
                await collection.insertOne({
                    roleList: roleList,
                    guildID: id
                })
            }
        }
        revalidatePath(`/app/${id}/welcome-module`);
    } catch (e) {
        errors.push("Internal server error. Try Again Later!")
    }
    if (errors.length>0) {
        return {
            errors
        }
    }
}