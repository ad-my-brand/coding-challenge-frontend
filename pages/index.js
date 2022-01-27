import { React, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import jsonPlaceholder from "./api/jsonPlaceholder";
import FormControl from "../components/FormControl";
import PostForm from "../components/PostForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const MapWithNoSSR = dynamic(() => import("../components/map"), {
    ssr: false,
  });

  const [users, setUsers] = useState([]);
  const [cord, setCord] = useState([]);
  const [select, setSelect] = useState(false);
  const [id, setId] = useState("");

  const onSelectChange = (value) => {
    const {
      address: {
        geo: { lat, lng },
      },
    } = users.find((user) => user.id === parseInt(value, 10));

    setCord([lat, lng]);
    setId(value);
    setSelect(true);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await jsonPlaceholder.get(`/users`);

      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <FormControl
        labelText={"Select A User"}
        users={users}
        onChange={onSelectChange}
        select={select}
        id={id}
      />
      {select && (
        <div className="conatiner flex m-20">
          <PostForm id={id} />
          <MapWithNoSSR cord={cord} />
        </div>
      )}
    </>
  );
}
