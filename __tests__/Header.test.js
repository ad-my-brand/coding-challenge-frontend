import Header from "../src/components/Header";
import { screen, render } from "@testing-library/react"
import "@testing-library/jest-dom";


describe("Header", () => {

    it("render all elements properly", () => {

        render(<Header />);

        // check if all elements are rendered
        expect(screen.getByTestId("logo__image")).toBeInTheDocument();
        expect(screen.getByTestId("logo__text")).toBeInTheDocument();
        expect(screen.getByTestId("social__icons")).toBeInTheDocument();
    })
})