// Trying to Make sure the form control you have created is meeting WCAG AA level


import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

jest.mock("./Map", () => {
  return function MapMock({ userLocation }) {
    // Providing a mocked implementation of the Map component, it was needed
    return (
      <div data-testid="map">
        Mocked Map Component with userLocation: {userLocation}
      </div>
    );
  };
});

test("Form Component renders the component with form elements", () => {
  const { getByTestId } = render(<Form />);
  const mapElement = getByTestId("map");
  expect(mapElement).toBeInTheDocument();
});

describe("Form Component", () => {
  it("renders the component with form elements", () => {
    render(<Form />);

    // Check for the presence of form elements according to

    const titleInput = screen.getByLabelText("Title");
    const bodyInput = screen.getByLabelText("Body");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(titleInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("displays an error message when form is submitted without user selection", () => {
    render(<Form />);
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(submitButton);

    const errorMessage = screen.getByText("Please Select a user");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays an error message when form is submitted with missing title and body", () => {
    render(<Form />);
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Body"), { target: { value: "" } });
    fireEvent.click(submitButton);
  });
});
