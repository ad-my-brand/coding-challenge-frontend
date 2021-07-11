import { screen, waitFor } from "@testing-library/react";
import { getPage } from "next-page-tester";

import { users } from "../__mocks__/mocks";
import { server, rest } from "../test-utils/server";

interface Request {
  userId: number;
  title: string;
  body: string;
}

test("displays the list of users", async () => {
  const { render } = await getPage({ route: "/" });

  if (typeof navigator === undefined) navigator = new Navigator() || {};

  render();

  users.user.forEach((u) => {
    expect(screen.getByRole("option", { name: u.name })).toBeInTheDocument();
  });
  expect(screen.getByText("Select user")).toBeInTheDocument();
});

test("checks for the existence of nodes and texts on the page", async () => {
  const { render } = await getPage({ route: "/" });

  render();

  expect(screen.getByLabelText("Create Post")).toBeInTheDocument();
  expect(screen.getByRole("form")).toBeInTheDocument();
});
