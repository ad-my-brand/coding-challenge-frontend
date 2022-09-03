import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Spinner from "../Spinner";

describe("Spinner", () => {
  test("should render an svg with class animate-spin", () => {
    render(<Spinner />);
    expect(screen.getByTestId("spinner").classList.toString()).toContain(
      "animate-spin"
    );
  });
});
