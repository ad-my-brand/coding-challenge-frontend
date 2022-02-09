import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "../App";

test("check if components is mount", () => {
  render(<App />);
  const Element = screen.getByText(/Form Contol/i);
  expect(Element).toBeInTheDocument();
});
