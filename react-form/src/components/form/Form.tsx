import { useState, useEffect } from "react";
import client from "../../api/client";

import Select from "../UI/Select";
import PostForm from "../postForm/PostForm";
import type { UserData } from "../../types";

type FormProps = {
  setSelectedUser: (user: UserData) => void;
};

const Form = ({ setSelectedUser }: FormProps) => {
  const [users, setUsers] = useState<UserData[] | null>(null);
  const [selectedUserID, setSelectedUserID] = useState<number>(0);

  // fetch users data to populate select
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await client.get("users");
        setUsers(data);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const selectUserHandler = (e: React.ChangeEvent): void => {
    const usersSelectField = e.target as HTMLSelectElement;
    const userID = Number(usersSelectField.value);
    setSelectedUserID(userID);

    // get selected user object
    const userObj = users?.filter((item) => item.id === userID)[0];
    if (userObj) {
      setSelectedUser(userObj);
    }
  };

  const validateSelectInput = (error: string) => {
    if (selectedUserID === 0) {
      return error;
    }

    return "";
  };

  return (
    <form className="w-full flex flex-col lg:justify-center mt-6 lg:mt-0 sm:w-11/12 md:w-3/4 lg:w-2/6 lg:h-screen rounded-md p-4 sm:p-8 lg:p-4 bg-slate-100">
      <h2 className="text-lg md:text-xl font-bold text-center text-blue-800 mb-6 bg-blue-100 border-b-2 border-blue-300 py-2">
        Locate a User
      </h2>
      <Select
        label="Users"
        data={users}
        onChange={selectUserHandler}
        validateInput={validateSelectInput}
      />
      <PostForm />
    </form>
  );
};

export default Form;
