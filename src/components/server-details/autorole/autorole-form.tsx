"use client"
import styles from "../common/forms.module.css";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {useFormState} from "react-dom";
import {updateAutoRole} from "@/lib/actions/autorole-module";
import {FormManager} from "@/contexts/modules/form-manager";
import Toggle from "@/components/form-inputs/toggle";
import SubmitForm from "@/components/form-inputs/submit-form";
import Warning from "@/components/utils/warning";

interface Role {
    id: string,
    name: string,
}

interface AutoRoleFormProps {
    id: string,
    children: React.ReactNode,
    presetData: {
        enabled: boolean,
        roleList: Role[]
    }
}


export default function AutoRoleForm({id, children, presetData}: AutoRoleFormProps) {
    const [currentResponse, formAction] = useFormState(updateAutoRole, {error: null})
    const [initData, setInitData] = useState(presetData)
    const [formData, setFormData]  = useState(presetData)
    const [isDirty, setIsDirty] = useState(false)
    const [errors, setErrors] = useState<[]>([])
    useEffect(() => {
        setIsDirty(JSON.stringify(formData) !== JSON.stringify(initData))
    }, [formData, initData]);
    useLayoutEffect(() => {
        if (currentResponse) {
            if (currentResponse.errors && currentResponse.errors.length > 0) {
                setErrors(currentResponse.errors)
            }
        }
    }, [currentResponse]);

    useEffect(() => {
        if (errors.length>0 ) {
            setInitData(presetData);
        } else {
            setInitData(formData)
        }
    }, [errors]);

    const handleCancel = () => {
        setErrors([])
        setFormData(initData)
    }

    const handleSubmit = () => {
        if (errors.length === 0 ) {
            setInitData(formData)
        }
        setErrors([])
    }

    return <FormManager.Provider value={{
        data: formData,
        setData: setFormData
    }}>
        <form className={styles.form} action={formAction}>
            <h1 className={styles.header}>
                AutoRole Module
            </h1>
            <div className={styles.toggleContainer}>
                <Toggle id="autorole" name="enabled"/>
                <div className={formData.enabled ? `${styles.text} ${styles.enabled}` : styles.text}>
                    <p className={styles.disabledText}>
                        Disabled
                    </p>
                    <p className={styles.enabledText}>
                        Enabled
                    </p>
                </div>
            </div>
            <div className={formData.enabled ? `${styles.formContainer} ${styles.formActive}` : styles.formContainer} style={{
                height: formData.enabled ? "110px" : "0"
            }}>
                <div className={styles.formItems}>
                    {children}
                </div>
            </div>
            <Warning>
                Do not select any role with elevated permissions (Manage Server, Administrator, etc)
            </Warning>
            <input type="hidden" value={id} name="server"/>
            <SubmitForm handleCancel={handleCancel} handleSubmit={handleSubmit} isDirty={isDirty} errors={errors.length} />
        </form>
        {errors.length>0 ? <ul style={{
            listStyleType: 'none',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 0
        }}>
            {errors.map(error => {
                return <li style={{
                    color: "#ffa3a3",
                    fontWeight: 900,
                    padding: 0
                }} key={error}>{error}</li>
            })}
        </ul> : null}
    </FormManager.Provider>
}