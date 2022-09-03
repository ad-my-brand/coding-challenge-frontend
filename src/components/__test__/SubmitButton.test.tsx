import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SubmitButton from "../SubmitButton";

describe("SubmitButton", () => {
  test("should render submit button disabled when loading is true", () => {
    render(<SubmitButton loading={true}></SubmitButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("should render spinner inside submit button when loading is true", () => {
    render(<SubmitButton loading={true}></SubmitButton>);
    expect(screen.getByRole("button")).toContainElement(
      screen.getByTestId("spinner")
    );
  });

  test("should render submit button enabled when loading is false", () => {
    render(<SubmitButton loading={false}></SubmitButton>);
    expect(screen.getByRole("button")).toBeEnabled();
  });
});
