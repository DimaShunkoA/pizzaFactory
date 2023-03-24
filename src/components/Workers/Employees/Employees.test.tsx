import {Employees} from './Employees'
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import * as reduxHooks from 'react-redux'

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
    },
    {
        "id": 3,
        "name": "Алла Котова",
        "isArchive": false,
        "role": "cook",
        "phone": "+7 (948) 523-2964",
        "birthday": "26.01.1982"
    }
]

jest.mock('react-redux')
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector')

describe("Employees", () =>{
    it('Filter employees isArchive is 0', () =>{
        mockedUseSelector.mockReturnValue(employees)

        render(
            <MemoryRouter initialEntries={["?isArchive=0"]}>
                <Employees/>
            </MemoryRouter>
        )

        const people = screen.getAllByTestId("employees");

        expect(people.length).toBe(2)
    })

    it('Filter employees role is waiter', () =>{
        mockedUseSelector.mockReturnValue(employees)

        render(
            <MemoryRouter initialEntries={["?role=waiter"]}>
                <Employees/>
            </MemoryRouter>
        )

        const people = screen.getAllByTestId("employees");

        expect(people.length).toBe(1)
    })

    it('Sort employees by name', () =>{
        mockedUseSelector.mockReturnValue(employees)

        render(
            <MemoryRouter initialEntries={["?sort=name"]}>
                <Employees/>
            </MemoryRouter>
        )

        const people = screen.getAllByTestId("employees");

        expect(people.length).toBe(3);
        expect(people[0]).toHaveTextContent("Александр Ларионов");
        expect(people[1]).toHaveTextContent("Алла Котова");
        expect(people[2]).toHaveTextContent("Илья Емельянов");
    })

    it('Filter is error', () =>{
        mockedUseSelector.mockReturnValue(employees)

        render(
            <MemoryRouter initialEntries={["?role=waiters"]}>
                <Employees/>
            </MemoryRouter>
        )

        const error = screen.getByTestId("error");

        expect(error).toHaveTextContent("Упс… Ничего не найдено. Давайте попробуем еще раз.");
    })
})