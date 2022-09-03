import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import FormControl from "../FormControl";

describe("FormControl", () => {
  test("should render an input by default", () => {
    render(<FormControl label="test" name="test"></FormControl>);
    expect(screen.getByTestId("input")).toBeDefined();
  });

  test('should render an select when component="select"', () => {
    render(<FormControl label="test" component="select"></FormControl>);
    expect(screen.getByTestId("select")).toBeDefined();
  });

  test('should render an textarea when component="textarea"', () => {
    render(<FormControl label="test" component="textarea"></FormControl>);
    expect(screen.getByTestId("textarea")).toBeDefined();
  });

  test("should display error label on invalid value if dirty", () => {
    render(
      <FormControl
        label="test"
        name="testid"
        component="input"
        validate={(state) => (state === "" ? "Invalid" : "")}
        dirty={true}
      ></FormControl>
    );
    const input = screen.getByTestId("input");
    userEvent.type(input, "hello world");
    expect(screen.getByText("Invalid")).toBeDefined();
  });
});
