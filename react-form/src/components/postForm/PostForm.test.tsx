import { render, screen, fireEvent } from "@testing-library/react";
import PostForm from "./PostForm";

describe("PostForm", () => {
  beforeEach(() => {
    render(<PostForm />);
  });

  test("renders correctly", () => {
    // input text boxes should be 2
    const textBox = screen.getAllByRole("textbox");
    expect(textBox.length).toBe(2);

    // should have a submit button
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("displays error on submitting form with blank data", async () => {
    // fire submit event
    fireEvent.click(screen.getByRole("button"));
    const errorMsg = await screen.getByText("Title and Body can not be blank.");
    expect(errorMsg).toBeInTheDocument();
  });

  test("displays success message on valid form submission", async () => {
    // providing data for title field
    const titleField = screen.getByRole("textbox", {
      name: /title/i,
    });

    fireEvent.change(titleField, { target: { value: "Post 1" } });

    // providing data for body field
    const bodyField = screen.getByRole("textbox", {
      name: /body/i,
    });

    fireEvent.change(bodyField, { target: { value: "lorem ipsum" } });

    // fire submit event
    fireEvent.click(screen.getByRole("button"));
    const successMsg = await screen.findByText("Successfully added post!");
    expect(successMsg).toBeInTheDocument();
  });
});
