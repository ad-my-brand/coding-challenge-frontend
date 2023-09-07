import { render, screen } from "@testing-library/react";
import Notification from "./Notification";

test("Notification displays Error correctly", () => {
  render(<Notification label="unable to post" success={false} />);
  const notificationMessage = screen.getByText("unable to post");
  expect(notificationMessage).toBeInTheDocument();
});
