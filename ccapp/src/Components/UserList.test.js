import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserList from "./UserList";

describe("UserList Component", () => {
  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
  ];

  it("renders the component with the select element", () => {
    render(<UserList users={users} onSelectUser={() => {}} />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });

  it("renders the list of users as options", () => {
    render(<UserList users={users} onSelectUser={() => {}} />);
    users.forEach((user) => {
      const optionElement = screen.getByText(user.name);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it("calls the onSelectUser function when a user is selected", () => {
    const onSelectUser = jest.fn();
    render(<UserList users={users} onSelectUser={onSelectUser} />);
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "2" } });
    expect(onSelectUser).toHaveBeenCalledWith(expect.objectContaining({ target: expect.objectContaining({ value: expect.any(String) }) }));
  });
  
});
