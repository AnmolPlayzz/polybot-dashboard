const api: string | undefined = process.env.PB_API;
if (!api) {
    throw new Error("Missing API url.");
}

export async function fetchChannels(serverId: string, type: string): Promise<{
    id: string,
    channels: {
        id: string,
        name: string,
        type: number
    }[]
}> {
    const channelDataReq = await fetch(`${api}/channels`, {
        method: "POST",
        body: JSON.stringify({
            guildId: serverId,
            channelType: type
        }),
        headers: {
            "Content-Type": "application/json"
        },
        next: {
            revalidate: 20
        }
    })
    if(!channelDataReq.ok) {
        throw new Error("Error getting server stats.")
    }

    const data = await channelDataReq.json()
    return data;
}

export async function fetchRoles(serverId: string): Promise<{
    id: string,
    roles: {
        id: string,
        name: string,
    }[]
}> {
    const channelDataReq = await fetch(`${api}/roles`, {
        method: "POST",
        body: JSON.stringify({
            guildId: serverId,
        }),
        headers: {
            "Content-Type": "application/json"
        },
        next: {
            revalidate: 20
        }
    })
    if(!channelDataReq.ok) {
        throw new Error("Error getting server stats.")
    }

    const data = await channelDataReq.json()
    return data;
}