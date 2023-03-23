import {ADD_EMPLOYEE, UPDATE_EMPLOYEE} from "./types";

type People = {
    id: number,
    name: string,
    isArchive: boolean,
    role: string,
    phone: string,
    birthday: string
}
export function addEmployee(employee: People){
    return{
        type: ADD_EMPLOYEE,
        payload: employee
    }
}

export function updateEmployee(employees: People[]){
    return{
        type: UPDATE_EMPLOYEE,
        payload: employees
    }
}