import WelcomeForm from "@/components/server-details/welcome/welcome-form";
import styles from "./welcome-page.module.css"
import RoleSelector from "@/components/form-inputs/role-selector";
import {fetchWelcome} from "@/lib/app/modules/welcome";

export default async function Page({ params }: {
    params: {
        id: string
    }
}) {
    const id = params.id;
    const data = await fetchWelcome(id)
    const initData = data.response ? {
        enabled: true,
        welcomeID: data.response.welcomeID,
        leaveID: data.response.leaveID
    } : {
        enabled: false,
        welcomeID: undefined,
        leaveID: undefined,
    }
    return <div className={styles.welcomeForm}>
        <WelcomeForm id={id} presetData = {initData} >
            <RoleSelector id={id} name={"welcomeID"} label={"Welcome Channel"} />
            <RoleSelector id={id} name={"leaveID"} label={"Leave Channel"} />
        </WelcomeForm>
    </div>
}