import json from '../resources/employees.json'
import {ADD_EMPLOYEE, UPDATE_EMPLOYEE} from "./types";

const initialState = {
    employees: json,
    lastId: 18
}

export const employeeReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case ADD_EMPLOYEE:
            return {...state, employees: [...state.employees, action.payload], lastId: ++state.lastId}
        case UPDATE_EMPLOYEE:
            return {...state, employees: [...action.payload]}
        default: return state
    }
}