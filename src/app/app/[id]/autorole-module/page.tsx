import styles from "./autorole-page.module.css";
import {fetchAutoRole} from "@/lib/app/modules/autorole";
import type {Metadata} from "next";
import AutoRoleForm from "@/components/server-details/autorole/autorole-form";
import RoleSelector from "@/components/form-inputs/role-selector";
import {fetchRoles} from "@/lib/app/discord-data";

function intersection (a: any, b: any) {
    const idsArray2 = new Set(b.map((item: any) => item));
    const commonElements = a.filter((item: any) => idsArray2.has(item.value));
    return commonElements
}

export const metadata: Metadata = {
    title: "AutoRole Module | PolyBot Dashboard",
};

export default async function Page({ params }: {
    params: {
        id: string
    }
}) {
    const id = params.id;

    const rolesData = await fetchRoles(id)
    const options = rolesData.roles.map((role) => {
        return {
            value: role.id,
            label: "@" + role.name
        }
    })

    const data = await fetchAutoRole(id)
    console.log("data", data)
    const initData = data.response ? {
        enabled: true,
        roleList: intersection(options, data.response.roleList)
    } : {
        enabled: false,
        roleList: []
    }
    return <div className={styles.autoRoleForm}>
        <AutoRoleForm id={id} presetData={initData}>
            <RoleSelector id={id} name="roleList" label="Select Roles" />
        </AutoRoleForm>
    </div>
}