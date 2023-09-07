import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomFormControl from "./CustomFormControl";

describe("CustomFormControl Component", () => {
  it("displays an error message when validation fails", () => {
    const validationFn = (value) =>
      value.length >= 3 ? "" : "Name must be at least 3 characters long";
    const onChange = jest.fn();
    render(
      <CustomFormControl
        label="Name"
        validationFn={validationFn}
        value=""
        onChange={onChange}
      />
    );

    const inputElement = screen.getByLabelText("Name");
    fireEvent.change(inputElement, { target: { value: "ab" } });

    // Use a custom text matching function
    const errorMessage = screen.getByText(
      (content, element) =>
        content === "Name must be at least 3 characters long" &&
        element.tagName.toLowerCase() === "div"
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
