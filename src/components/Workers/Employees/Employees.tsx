// @flow
import * as React from 'react';
import {Employee} from "./Employee/Employee";
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {IRootState} from "../../../index";
import styles from "./Employees.module.scss"

type People = {
    id: number,
    name: string,
    isArchive: boolean,
    role: string,
    phone: string,
    birthday: string
}

export const Employees = () => {
    const [searchParams] = useSearchParams();

    const role = searchParams.get("role")
    const isArchive = String(searchParams.get("isArchive") ? searchParams.get("isArchive") : "")
    const sort = searchParams.get("sort")

    let employees = useSelector((state:IRootState) => state.employee.employees)

    const filterEmployees = () => {

        if(role){
            employees = employees.filter(employee => employee.role.includes(role))
        }

        if(isArchive){
            if(isArchive === '1'){
                employees = employees.filter(employee => employee.isArchive)
            }else if(isArchive === '0'){
                employees = employees.filter(employee => !employee.isArchive)
            }else {
                employees = []
            }
        }

        return employees
    }

    const byName = (field:string) => {
        return (a:any, b:any) => a[field].toUpperCase() > b[field].toUpperCase() ? 1 : -1;
    }

    const byId = (field:string) => {
        return (a:any, b:any) => a[field] > b[field] ? 1 : -1;
    }

    const byBirthday = (field:string) => {
        return (a:any, b:any) => convertDate(a[field]) > convertDate(b[field]) ? 1 : -1;
    }

    const convertDate =(d: string) => {
        return new Date(d.split('.').reverse().join('-'));
    }

    const sortEmployees = () => {
        if(sort){
            if(sort === "name"){
                employees = employees.slice().sort(byName(sort))
            }else if(sort === "birthday"){
                employees = employees.slice().sort(byBirthday(sort))
            }
        }else {
            employees = employees.slice().sort(byId("id"))
        }

        return employees
    }

    const sortAndFilter = () => {
        employees = sortEmployees()
        employees = filterEmployees()

        return employees
    }

    const sortAndFilterEmployee =  sortAndFilter()

    return (
        <div className={styles.employees}>
            {sortAndFilterEmployee.length ?
                sortAndFilterEmployee.map((employee: People) => {
                    return(
                        <div data-testid="employees" key={employee.id}>
                            <Employee employee={employee}/>
                        </div>
                    )
                })
                :
                <div data-testid="error" className={styles.error}>
                    Упс… Ничего не найдено. Давайте попробуем еще раз.
                </div>
            }
        </div>
    );
};