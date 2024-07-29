import SelectMenu from "@/components/form-inputs/select-menu";
import {fetchChannels} from "@/lib/app/discord-data";
export default async function RoleSelector({id, name, label}: {
    id: string,
    name: string,
    label: string,
    preset?: string,
}) {
    const channels = await fetchChannels(id, "0")
    const options = channels.channels.map((channel) => {
        return {
            value: channel.id,
            label: "# " + channel.name
        }
    })
    return <SelectMenu options={options} name={name} label={label} />
}