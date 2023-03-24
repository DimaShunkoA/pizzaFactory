import {Forms} from "./Forms";
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import * as reduxHooks from 'react-redux'
import * as actions from '../../../redux/action'

const employeeSuccess = {
    id: 18,
    name: "Иван Иванов",
    isArchive: false,
    role: "cook",
    phone: "+7 (948) 523-2964",
    birthday: "06.01.1987"
}

const employeeError = {
    id: 18,
    name: "Иван Иванов",
    isArchive: false,
    role: "cook",
    phone: "+7 (948) 523-296",
    birthday: "06.01.2200"
}

const employees = [
    {
        "id": 1,
        "name": "Илья Емельянов",
        "isArchive": false,
        "role": "cook",
        "phone": "+7 (883) 508-3269",
        "birthday": "12.02.1982"
    },
    {
        "id": 2,
        "name": "Александр Ларионов",
        "isArchive": true,
        "role": "waiter",
        "phone": "+7 (823) 440-3602",
        "birthday": "26.01.1986"
    }
]

jest.mock('react-redux')
const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch')
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector')
describe("Forms", () => {
    it('Employee add success', () =>{
        mockedDispatch.mockReturnValue(jest.fn())

        const mockedAddEmployee = jest.spyOn(actions, 'addEmployee')

        render(
            <BrowserRouter>
                <Forms employees={employeeSuccess} isAdd={true} handleClose={() => {}}/>
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId("addOrEdit"))
        expect(mockedAddEmployee).toHaveBeenCalledWith(employeeSuccess)
    })

    it('Employee add error', () =>{
        const dispatch = jest.fn()
        mockedDispatch.mockReturnValue(dispatch)

        render(
            <BrowserRouter>
                <Forms employees={employeeError} isAdd={true} handleClose={() => {}}/>
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId("addOrEdit"))
        expect(dispatch).toHaveBeenCalledTimes(0);
    })

    it('Employee edit success', () =>{
        const dispatch = jest.fn()
        mockedDispatch.mockReturnValue(dispatch)

        const mockedAddEmployee = jest.spyOn(actions, 'updateEmployee')
        mockedUseSelector.mockReturnValue(employees)

        render(
            <BrowserRouter>
                <Forms employees={employees[1]} isAdd={false} handleClose={() => {}}/>
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId("addOrEdit"))
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedAddEmployee).toHaveBeenCalledWith(employees)
    })

    it('Employee edit error', () =>{
        const dispatch = jest.fn()
        mockedDispatch.mockReturnValue(dispatch)

        render(
            <BrowserRouter>
                <Forms employees={employeeError} isAdd={false} handleClose={() => {}}/>
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId("addOrEdit"))
        expect(dispatch).toHaveBeenCalledTimes(0);
    })
})