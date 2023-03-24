import {Filter} from './Filter'
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";


describe('Filter', () => {
    it("Filter param role is driver", async () => {

        render(
            <BrowserRouter>
                <Filter/>
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId("button"))
        fireEvent.change(screen.getByTestId("select"), { target: { value: "driver" } })

        const getPageParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get("role");
        }

        expect(getPageParams()).toBe("driver");
    })

    it("Filter param isArchive is true", async () => {

        render(
            <BrowserRouter>
                <Filter/>
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId("button"))
        fireEvent.click(screen.getByTestId("isArchive"))

        const getPageParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get("isArchive");
        }

        expect(getPageParams()).toBe("1");
    })

    it("Filter param reset", async () => {

        render(
            <BrowserRouter>
                <Filter/>
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId("button"))
        fireEvent.change(screen.getByTestId("select"), { target: { value: "driver" } })
        fireEvent.click(screen.getByTestId("isArchive"))
        fireEvent.click(screen.getByTestId("reset"))

        const getPageParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const role = searchParams.get("role")
            const isArchive = searchParams.get("isArchive")
            return [role, isArchive];
        }

        expect(getPageParams()[0]).toBe(null);
        expect(getPageParams()[1]).toBe(null);
    })

    it("Filter params role is cook and isArchive is true", async () => {

        render(
            <BrowserRouter>
                <Filter/>
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId("button"))
        fireEvent.change(screen.getByTestId("select"), { target: { value: "cook" } })
        fireEvent.click(screen.getByTestId("isArchive"))

        const getPageParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const role = searchParams.get("role")
            const isArchive = searchParams.get("isArchive")
            return [role, isArchive];
        }

        expect(getPageParams()[0]).toBe("cook");
        expect(getPageParams()[1]).toBe("1");
    })
})