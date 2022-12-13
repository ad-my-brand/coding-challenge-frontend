import axios from "axios";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async (setUsers, setMsg) => {
  const configuration = {
    method: "get",
    url: `${API_URL}/users`,
  };

  setMsg("Fetching users... ");
  await axios(configuration)
    .then((result) => {
      setMsg("");
      setUsers(result.data);
    })
    .catch((error) => {
      console.log(error.response);
      setMsg("Couldn't fetch users. " + error.message);
    });
};

export const postData = async (data, success, err) => {
  const { title, body, userId } = data;
  const configuration = {
    method: "post",
    url: `${API_URL}/posts`,
    data: {
      title,
      body,
      userId,
    },
  };

  await axios(configuration)
    .then((result) => {
      success(result);
    })
    .catch((error) => {
      err(error);
    });
};

export const Map = ({ location }) => {
  const [load, setLoad] = useState(true);

  if (!location?.lat || !location?.long)
    return (
      <div className="w-full flex items-center bg-gray-300  dark:bg-gray-700 dark:text-gray-100  py-4 mb-2 rounded-md flex-col">
        <div className="flex flex-row items-center">
          <AiOutlineInfoCircle className="mr-2" />
          Select a user to display the location
        </div>
      </div>
    );

  const embedurl = `https://maps.google.com/maps?q=${location.lat},${location.long}&output=embed&ie=UTF8`;
  return (
    <div className="w-full h-[250px] mb-10 rounded-md">
      <label
        type="text"
        className="block text text-center font-semibold pl-1 mb-2"
      >
        Location
        {load && " loading ..."}
      </label>
      <iframe
        className="rounded bg-transparent border-none"
        title="Location"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={embedurl}
        width="100%"
        height="100%"
        onLoad={() => {
          setLoad(false);
        }}
      ></iframe>
    </div>
  );
};
