// @flow
import * as React from 'react';
import {Form, Input} from "reactstrap";
import styles from "./Forms.module.scss";
import InputMask from "react-input-mask";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {addEmployee, updateEmployee} from "../../../redux/action";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../index";

const styleSelect = {
    color: '#dc2626',
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#dc2626',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#dc2626',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#dc2626',
    },
    '.MuiSvgIcon-root ': {
        fill: "#dc2626 !important",
    }
}

type People = {
    id: number,
    name: string,
    isArchive: boolean,
    role: string,
    phone: string,
    birthday: string
}

type IProps = {
    employees: People,
    isAdd: boolean,
    handleClose : () => void
}

export const Forms = ({employees, isAdd, handleClose}: IProps) => {

    const [employee, setEmployee] = useState({...employees})
    const dispatch = useDispatch()
    let employeesAll = useSelector((state:IRootState) => state.employee.employees)

    const [nameError, setNameError] = useState("")
    const [roleError, setRoleError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [birthdayError, setBirthdayError] = useState("")


    const handleChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        })
    };

    const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.checked
        })
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        if(validate()){

            if(isAdd){
                dispatch(addEmployee(employee))
            }else {
                const id = employee.id-1
                employeesAll[id].name = employee.name
                employeesAll[id].isArchive = employee.isArchive
                employeesAll[id].role = employee.role
                employeesAll[id].phone = employee.phone
                employeesAll[id].birthday = employee.birthday

                dispatch(updateEmployee(employeesAll))
            }

            handleClose()
        }
    }

    const nameValidate = (name: string) => {
        setNameError("")

        if(!name.length){
            setNameError("Имя не должно быть пустым")
            return true
        }else if(!(/^([а-яё, "]+)$/i).test(name)){
            setNameError("Только русские буквы")
            return true
        }

        return false
    }

    const roleValidate = (role: string) => {
        setRoleError("")

        if(!role.length){
            setRoleError("Должность не выбрана")
            return true
        }

        return false
    }

    const phoneValidate = (phone: string) => {
        setPhoneError("")

        if(phone.includes('_') || !phone.length){
            setPhoneError("Телефон введен некоректно")
            return true
        }

        return false
    }

    const birthdayValidate = (birthday: string) => {
        setBirthdayError("")

        if(!birthday.includes('_')){
            if(isNaN(convertDate(birthday))){
                setBirthdayError("Дата введена некоректно")
                return true
            }else if(Date.now() < convertDate(birthday)){
                setBirthdayError("Что-то из будущего")
                return true
            }else if(getAge(birthday) < 18){
                setBirthdayError("Несовершеннолетний")
                return true
            }
        }else {
            setBirthdayError("Дата введена некоректно")
            return true
        }

        return false
    }

    const getAge = (date:string) => {
        return ((Date.now() - convertDate(date)) / (24 * 3600 * 365.25 * 1000));
    }

    const convertDate = (d: string) => {
        return Date.parse(d.split('.').reverse().join('-'));
    }

    const validate = () => {
        const {name, role, phone, birthday} = employee

        const errorName = nameValidate(name)
        const errorRole = roleValidate(role)
        const errorPhone = phoneValidate(phone)
        const errorBirthday =  birthdayValidate(birthday)

       return !(errorName || errorRole || errorPhone || errorBirthday);
    }

    const {name, isArchive, role, phone, birthday} = employee

    return (
        <Form onSubmit={handleSubmit}>
            <div className={styles.heading}>
                {isAdd ? <span>НОВЫЙ РАБОТНИК</span> : <span>РЕДАКТИРОВАТЬ</span>}
            </div>

            <div className={styles.box}>
                <div className={styles.inputs}>
                    <div>
                        <Input
                            className={styles.input}
                            placeholder="Имя"
                            name="name"
                            value={name}
                            autoComplete='off'
                            onChange={handleChangeInputs}
                        />
                        <div className={styles.error}>
                            {nameError}
                        </div>
                    </div>

                    <div>
                        <InputMask
                            className={styles.input}
                            placeholder="Телефон"
                            mask='+7 (999) 999-9999'
                            value={phone}
                            name="phone"
                            autoComplete='off'
                            onChange={handleChangeInputs}
                        />
                        <div className={styles.error}>
                            {phoneError}
                        </div>
                    </div>

                    <div>
                        <InputMask
                            className={styles.input}
                            placeholder="Дата рождения"
                            mask='99.99.9999'
                            value={birthday}
                            name="birthday"
                            autoComplete='off'
                            onChange={handleChangeInputs}
                        />
                        <div className={styles.error}>
                            {birthdayError}
                        </div>
                    </div>
                </div>

                <div>
                    <div className={styles.inputs}>
                        <Box sx={{ minWidth: 175 }}>
                            <FormControl fullWidth>
                                <Select
                                    sx={styleSelect}
                                    placeholder="Enter Car Brand"
                                    className={styles.select}
                                    name="role"
                                    value={role}
                                    onChange={handleChangeSelect}
                                    displayEmpty
                                    renderValue={role !== "" ? undefined : () => "Должность"}
                                >
                                    <MenuItem sx={{color: '#dc2626', fontSize: '14px'}} value={"driver"}>DRIVER</MenuItem>
                                    <MenuItem sx={{color: '#dc2626', fontSize: '14px'}} value={"cook"}>COOK</MenuItem>
                                    <MenuItem sx={{color: '#dc2626', fontSize: '14px'}} value={"waiter"}>WAITER</MenuItem>
                                </Select>
                            </FormControl>
                            <div className={styles.error}>
                                {roleError}
                            </div>
                        </Box>

                        <FormControlLabel
                            className={styles.check}
                            control={<Checkbox className={styles.check} checked={isArchive} onChange={handleChangeCheckBox} name="isArchive"/>}
                            label="В архиве"
                        />

                        <Button className={styles.btn} variant="outlined" type="submit">
                            {isAdd ? <span>Добавить</span> : <span>Изменить</span>}
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    );
};