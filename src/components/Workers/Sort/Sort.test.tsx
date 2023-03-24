import {Sort} from './Sort'
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

describe('Sort', () => {
    it("Sort param name", () => {

        render(
            <BrowserRouter>
                <Sort />
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId("open"))
        fireEvent.click(screen.getByTestId("name"))

        const getPageParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get("sort");
        }

        expect(getPageParams()).toBe("name");
    })

    it("Sort param birthday", () => {

        render(
            <BrowserRouter>
                <Sort />
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId("open"))
        fireEvent.click(screen.getByTestId("birthday"))

        const getPageParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get("sort");
        }

        expect(getPageParams()).toBe("birthday");
    })

    it("Sort param reset", () => {
        render(
            <BrowserRouter>
                <Sort />
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId("open"))
        fireEvent.click(screen.getByTestId("reset"))

        const getPageParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get("sort");
        }

        expect(getPageParams()).toBe(null);
    })

    it("Sort params", () => {
        render(
            <BrowserRouter>
                <Sort />
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId("open"))
        fireEvent.click(screen.getByTestId("name"))
        fireEvent.click(screen.getByTestId("birthday"))
        fireEvent.click(screen.getByTestId("reset"))
        fireEvent.click(screen.getByTestId("birthday"))

        const getPageParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get("sort");
        }

        expect(getPageParams()).toBe("birthday");
    })
})