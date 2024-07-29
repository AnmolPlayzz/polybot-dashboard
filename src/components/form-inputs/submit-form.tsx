"use client"
import styles from "./submit-form.module.css"
import { useFormStatus } from "react-dom"

export default function SubmitForm({handleCancel, handleSubmit, isDirty, errors}: {
    handleCancel: () => void,
    handleSubmit: () => void,
    isDirty: boolean,
    errors?: number
}) {
    const { pending } = useFormStatus();

    return <div className={(isDirty || pending || errors!==0) ? `${styles.submitMenu} ${styles.show}` : styles.submitMenu}>
        <p className={styles.text}>
            You have unsaved changes
        </p>
        <button className={styles.reset} onClick={handleCancel} type="reset">
            Reset
        </button>
        <button className={pending ? `${styles.save} ${styles.pending}` : styles.save} onClick={handleSubmit} type="submit">
            {pending ? "Saving..." : "Save"}
        </button>
    </div>
}