"use client"

import React, {useContext, useEffect, useState} from "react";
import {FormManager} from "@/contexts/modules/form-manager";
import styles from "./multi-select-menu.module.css";
import {MdArrowDropDown, MdCheck, MdCheckBox, MdCheckCircle, MdChecklist} from "react-icons/md";
import Image from "next/image";


export default function MultiSelectMenu({options, name, label, min, max}: {
    options: {
        [key: string]: any
    }[],
    name: string,
    label: string,
    min: number,
    max: number
}) {
    const {data, setData} = useContext(FormManager);
    const [isOpen, setIsOpen] = useState(false);
    const defaults = data[name] ? data[name] : []
    const [selectedOptions, setSelectedOptions] = useState(
        defaults
    );

    const toggleDropdown = () => setIsOpen(val => !val);

    const handleOptionClick = (option: {
        [key: string]: any
    }) => {
        setSelectedOptions((options: {
            [key: string]: any
        }[]) => {
            const isAlreadySelected = options.some(item => item.value === option.value);
            if (isAlreadySelected) {
                return options.filter(opt => opt.value !== option.value);
            } else {
                if (selectedOptions.length < max) {
                    return [...options, option];
                } else {
                    return options
                }
            }
        });
    };

    useEffect(() => {
        setData((prev: any) => ({
            ...prev,
            [name]: selectedOptions
        }));
    }, [selectedOptions]);

    useEffect(() => {
        if (data[name]) {
            if (data[name] !== selectedOptions) {
                setSelectedOptions(data[name])
            }
        } else {
            setSelectedOptions([])
        }
    }, [data]);

    return (
        <>
            <p className={styles.label}>
                {label} ({selectedOptions.length}/{max})
            </p>
            <div className={styles.mainContainer}>
                <div className={isOpen ? `${styles.selectedOption} ${styles.open}` : styles.selectedOption}
                     onClick={toggleDropdown}>
                    {selectedOptions.length>0 ?
                        selectedOptions.map((opt: {
                            [p: string]: string
                        }) => {
                            return <span key={opt.value} className={styles.selectedOptions}>{opt.label}</span>
                        })
                        : 'Select an option'}
                    <div className={styles.imageContainer}>
                        <MdArrowDropDown className={styles.icon}/>
                    </div>
                </div>
                {isOpen && (
                    <div className={styles.optionList}>
                        {options.map((option) => (
                            <div className={styles.option} key={option.value} onClick={() => handleOptionClick(option)}>
                                <span className={styles.text}>{option.label}</span>
                                <div className={selectedOptions.some((opt: {
                                    [p: string]: string
                                }) => opt.value === option.value) ? `${styles.checkbox} ${styles.checked}` : styles.checkbox}>
                                    <Image src="/icons/app/components/checkmark.svg" className={styles.checkIcon} alt={"checkmark"} width={12} height={12} priority={true} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <input
                    type="hidden"
                    name={name}
                    id={name}
                    value={selectedOptions.length>0 ? selectedOptions.reduce((acc:string, cur: {
                        [p: string]: string
                    }): string => acc + "," + cur.value, "").slice(1) : ''}
                />
            </div>
        </>
    );
}