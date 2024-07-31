import SelectMenu from "@/components/form-inputs/select-menu";
import {fetchRoles} from "@/lib/app/discord-data";
import MultiSelectMenu from "@/components/form-inputs/multi-select-menu";
export default async function RoleSelector({id, name, label}: {
    id: string,
    name: string,
    label: string,
    preset?: string,
}) {
    const rolesData = await fetchRoles(id)
    const options = rolesData.roles.map((role) => {
        return {
            value: role.id,
            label: "@" + role.name
        }
    })
    return <MultiSelectMenu options={options} name={name} label={label} max={5} min={1} />
}