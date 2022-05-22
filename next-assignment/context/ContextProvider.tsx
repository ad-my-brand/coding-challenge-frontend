import React, { createContext } from "react";
import { UsersList } from "../components/UsersList/UsersList";

export const UsersContext = createContext(UsersList);

export const UsersContextProvider = ({ children }: any) => {
  return (
    <UsersContext.Provider value={UsersList}>{children}</UsersContext.Provider>
  );
};
