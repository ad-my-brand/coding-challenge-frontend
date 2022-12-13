import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import Spinner from "./Spinner";
import { fetchUsers, postData, Map } from "./utils";

const labelClass =
  " block mr-2 px-3 py-2 mt-2 font-semibold dark:text-gray-100 bg-white dark:bg-gray-700 rounded-md text-center w-full max-w-[60px]";
const inputClass =
  " block w-full px-3 py-2 mt-2 dark:bg-gray-900 dark:text-gray-100 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ";
const errClass = "text-red-500 pl-1 text-sm pt-1";

const Form = () => {
  const [msg, setMsg] = useState("");
  const [spinner, setSpinner] = useState(false);

  const [users, setUsers] = useState(null);

  const userId = useRef(null);
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [err, setErr] = useState([]);

  useEffect(() => {
    fetchUsers(setUsers, setMsg);
  }, []);

  const handleChange = (e, setType, t1, t2) => {
    const value = e.target.value;
    const type = e.target.getAttribute("variant");
    const errmsg = err;
    if (value === t2 || "") {
      errmsg[type] = t1;
    } else {
      errmsg[type] = "";
    }
    setType(value);
    setErr((_) => errmsg);
  };

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    let ret = false;
    if (user === "") {
      setErr((err) => ({ ...err, user: `Please select a User` }));
      ret = true;
    }

    if (title === "") {
      setErr((err) => ({ ...err, title: `Empty Title` }));
      ret = true;
    }

    if (body === "") {
      setErr((err) => ({ ...err, body: `Empty Body` }));
      ret = true;
    }

    if (ret) {
      return;
    }

    setSpinner(true);
    setMsg("Trying to post data..");
    postData(
      { title, body, userId },
      (result) => {
        setMsg(`Data Post was successful.`);
        setSpinner(false);
        console.log(result.data);
      },
      (error) => {
        setSpinner(false);
        setMsg(error.message);
        console.log(error.response);
      }
    );
  };

  return (
    <div className="flex flex-col flex-wrap justify-center min-h-[90vh]">
      <Message msg={msg} setMsg={setMsg} classes="mb-2" />
      <div className="bg-gray-200 dark:bg-gray-800 self-center sm:w-[66%] lg:w-[40%] w-[90%] p-4 rounded-md shadow-md">
        <h1 className="text-2xl text-center tracking-wide">Post With Form</h1>
        <form className="mt-6 ">
          <div className="mb-2 ">
            <div className="flex flex-row items-center">
              <label type="text" className={labelClass}>
                User
              </label>
              <select
                className={inputClass}
                variant="user"
                onChange={(e) =>
                  handleChange(
                    e,
                    setUser,
                    "Please select a user",
                    "select user"
                  )
                }
              >
                <option value="select user">Select User</option>
                {users?.map((user) => {
                  return (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {err?.user !== "" && <p className={errClass}>{err.user}</p>}
          </div>

          <div className="mb-2">
            {users && (
              <Map
                location={{
                  lat: Number(users[user - 1]?.address.geo.lat),
                  long: Number(users[user - 1]?.address.geo.lng),
                }}
              />
            )}
          </div>
          <div className="mb-2">
            <div className="flex flex-row items-center">
              <label type="text" className={labelClass}>
                Title
              </label>
              <input
                type="text"
                className={inputClass}
                value={title}
                variant="title"
                onChange={(e) => handleChange(e, setTitle, "Empty Title", "")}
                placeholder="Enter title"
              />
            </div>
            {err?.title !== "" && <p className={errClass}>{err.title}</p>}
          </div>

          <div className="mb-2">
            <div className="flex flex-row items-center">
              <label type="text" className={labelClass}>
                Body
              </label>
              <input
                type="text"
                className={inputClass}
                value={body}
                variant="body"
                onChange={(e) => handleChange(e, setBody, "Empty Body", "")}
                placeholder="Enter Body"
              />
            </div>
            {err?.body !== "" && <p className={errClass}>{err.body}</p>}
          </div>
          <button
            className="mt-6 flex flex-row items-center w-full justify-center bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 py-2 tracking-wide text-white "
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            <Spinner
              spinner={spinner}
              classes="mx-3 mr-auto text-lg text-white"
            />
            <div className="">Submit</div>
            <Spinner
              spinner={spinner}
              classes="mx-3 text-lg ml-auto text-white"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
