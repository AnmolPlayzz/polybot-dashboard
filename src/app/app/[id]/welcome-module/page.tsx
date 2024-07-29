import WelcomeForm from "@/components/server-details/welcome/welcome-form";
import styles from "./welcome-page.module.css"
import ChannelSelector from "@/components/form-inputs/channel-selector";
import {fetchWelcome} from "@/lib/app/modules/welcome";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Welcome Module | PolyBot Dashboard",
};

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
            <ChannelSelector id={id} name={"welcomeID"} label={"Welcome Channel"} />
            <ChannelSelector id={id} name={"leaveID"} label={"Leave Channel"} />
        </WelcomeForm>
    </div>
}