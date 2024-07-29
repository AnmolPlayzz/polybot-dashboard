"use client"
import styles from "./select-menu.module.css"
import React, {useContext, useEffect, useState} from 'react';
import {MdArrowDropDown} from "react-icons/md";
import {FormManager} from "@/contexts/modules/form-manager";

export default function SelectMenu({options, name, label}: {
    options: {
        [key: string]: any
    }[],
    name: string,
    label: string
}) {
    const {data, setData} = useContext(FormManager);
    const [isOpen, setIsOpen] = useState(false);
    const defaults = data[name] ? options.find(opt => opt.value === data[name]) : null
    const [selectedOption, setSelectedOption] = useState(
        defaults
    );

    const toggleDropdown = () => setIsOpen(val => !val);

    const handleOptionClick = (option: {
        [key: string]: any
    }) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    useEffect(() => {
        if (selectedOption) {
            setData((prev: any) => ({
                ...prev,
                [name]: selectedOption.value,
            }));
        }
    }, [selectedOption]);

    useEffect(() => {
        const option = data[name] ? options.find(opt => opt.value === data[name]) : null
        setSelectedOption(option)
    }, [data]);

    return (
        <>
            <p className={styles.label}>
                {label}
            </p>
            <div className={styles.mainContainer}>
                <div className={isOpen ? `${styles.selectedOption} ${styles.open}` : styles.selectedOption}
                     onClick={toggleDropdown}>
                    {selectedOption ? selectedOption.label : 'Select an option'}
                    <div className={styles.imageContainer}>
                        <MdArrowDropDown className={styles.icon}/>
                    </div>
                </div>
                {isOpen && (
                    <div className={styles.optionList}>
                        {options.map((option) => (
                            <div className={styles.option} key={option.value} onClick={() => handleOptionClick(option)}>
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
                <input
                    type="hidden"
                    name={name}
                    id={name}
                    value={selectedOption ? selectedOption.value : ''}
                />
            </div>
        </>
    );
};