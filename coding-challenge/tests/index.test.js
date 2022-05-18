import FormControl from "../components/formControl";

import Home from "../pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";


describe("FormControl", () => {
    it("should render a label", () => {
        const { getByText } = render(<FormControl type="text" label="Test" />);
        expect(getByText("Test")).toBeInTheDocument();
    });

    it("should render a text input", () => {
        const { getByDisplayValue } = render(<FormControl type="text" value="Test" />);
        expect(getByDisplayValue("Test")).toBeInTheDocument();
    });

    it("should render a select input with options", () => {
        render(<FormControl type="select" options={[{ id: 1, name: "Test" }]} />);
        expect(screen.getAllByRole("option")).toHaveLength(2);
    });
})

describe("MainForm", () => {
    it("should send post request", async () => {
        const { getByText, getByLabelText } = render(<Home />);
        jest.useFakeTimers();
        setTimeout(async () => {
            const title = getByLabelText("Title");
            const body = getByLabelText("Body");
            const select = getByLabelText("Select User");
            fireEvent.change(title, { target: { value: "Test" } });
            fireEvent.change(body, { target: { value: "Test" } });
            fireEvent.change(select, { target: { value: 1 } });
            fireEvent.click(getByText("Post"));
            await waitFor(() => {
                expect(screen.getByText("Post added successfully")).toBeInTheDocument();
            });
            console.log("hi");
        }, 1000);
    });
})
