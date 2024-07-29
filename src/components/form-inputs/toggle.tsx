"use client"
import styles from "./toggle.module.css"
import {useContext, useEffect, useState} from "react";
import {FormManager} from "@/contexts/modules/form-manager";
export default function Toggle({id, name}: {
    id: string,
    name: string
}) {
    const {data, setData} = useContext(FormManager)

    function handleClick() {
        setData((props: any)=> ({
            ...props,
            [name]: !props[name]
        }))
    }

    return <label htmlFor={id} className={styles.switch}>
        <input className={styles.input} id={id} name={id} type="checkbox" onClick={handleClick} defaultChecked={data.enabled}/>
        <span className={styles.slider}></span>
    </label>
}