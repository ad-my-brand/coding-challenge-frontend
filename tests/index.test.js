import UserForm from "../components/UserForm/UserForm";
import Input from "../components/Input/Input";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Input", () => {
    it("renders label", () => {
        const { getByText } = render(<Input type="text" label="Test001" />);
        expect(getByText("Test001")).toBeInTheDocument();
    });

    it("renders input value", () => {
        const { getByDisplayValue } = render(<Input type="text" value="Test001" onChange={()=>{}} />);
        expect(getByDisplayValue("Test001")).toBeInTheDocument();
    });
})

describe("UserForm", () => {
    it("should send post request", async () => {
        const { getByText, getByLabelText } = render(<UserForm />);
        jest.useFakeTimers();
        setTimeout(async () => {
            const title = getByLabelText("Title");
            const body = getByLabelText("Body");
            const selected = getByText("nameId")
            fireEvent.change(title, { target: { value: "Test001" } });
            fireEvent.change(body, { target: { value: "Test001" } });
            fireEvent.change(selected, { target: { value: 1 } });
            fireEvent.click(getByText("Add"));
            await waitFor(() => {
                expect(screen.getByText("Post Submitted")).toBeInTheDocument();
            });
        }, 1000);
    });
})