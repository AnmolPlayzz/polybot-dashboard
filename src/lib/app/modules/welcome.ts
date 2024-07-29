import "server-only"
import mongoClient from "@/lib/app/mongo";

export async function fetchWelcome(serverId: string): Promise<{
    [res: string]: any;
}> {
    try {
        const db = mongoClient.db("polybot");
        const collection = db.collection('welcome');
        const data = (await collection.find({ guildID: serverId }).toArray()).at(0)
        return {
            response: data
        }
    } catch (e: any) {
        return {
            error: e.message,
        };
    }

}