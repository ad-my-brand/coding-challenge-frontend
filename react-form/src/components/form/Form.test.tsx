import { render, screen } from "@testing-library/react";
import Form from "./Form";

describe("Form", () => {
  beforeEach(() => {
    render(<Form setSelectedUser={() => {}} />);
  });

  test("renders correctly", () => {
    // contains a select field
    const selectField = screen.getByRole("combobox");
    expect(selectField).toBeInTheDocument();
  });

  test("displays error when a user is not selected", () => {
    const errorMsg = screen.getByText("Please select a user.");
    expect(errorMsg).toBeInTheDocument();
  });
});
