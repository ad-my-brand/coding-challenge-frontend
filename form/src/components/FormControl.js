import React, { useEffect, useState, useRef } from 'react'
import Map from './Map';
import { FiAlertCircle } from 'react-icons/fi';
import './FormControl.css';

function FormControl(props) {
    const [users, setUsers] = useState();
    const [selectedUsers, setSelectedUsers] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);

    const userId = useRef(null);

    const getUsers = async () => {
        // setUsers([]);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
                setUsers(json);
                console.log(json)
            })
        // .then(response => console.log("response", response))

    }
    useEffect(() => {
        getUsers();
    }, [])

    const postData = async (data, success, err) => {
        const { title, body, userId } = data;

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            data: {
                title,
                body,
                userId,
            }
        })
            .then(response => response.json())
            .then(json => console.log(json));
    }

    const handleChange = (e, setType, type1, type2) => {
        const value = e.target.value;
        const type = e.target.getAttribute("variant");
        const errormsg = error;
        if (value === type2 || "") {
            errormsg[type] = type1;
        } else {
            errormsg[type] = "";
        }
        setType(value);
        setError((_) => errormsg);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let ret = false;
        if (selectedUsers === "") {
            setError((err) => ({ ...err, user: `Please select a User` }));
            ret = true;
        }

        if (title === "") {
            setError((err) => ({ ...err, title: `Title cannot be empty` }));
            ret = true;
        }

        if (body === "") {
            setError((err) => ({ ...err, body: `Body cannot be empty` }));
            ret = true;
        }

        if (ret) {
            return;
        }

        postData(
            { title, body, userId },
            (result) => {
                console.log(result.data);
            },
            (error) => {
                console.log(error.response);
            }
        );
        setSuccess(true)
    };

    return (
        <div className='flex flex-col items-center'>
            {!success ?
                <form className='flex flex-col items-center bg-slate-800 m-6 rounded-xl shadow-lg shadow-slate-400'>
                    <div className="p-6 max-w-sm mx-auto m-4  bg-gradient-to-r from-blue-800 to-pink-500 rounded-xl shadow-lg flex items-center space-x-4">
                        <label className="text-xl font-medium text-white" htmlFor={props.label}>{props.label}</label>
                    </div>
                    {console.log("users", users)}
                    <div>
                        <select
                            className='rounded-full border-2 border-black w-72 h-10 m-2 text-center bg-slate-100'
                            variant='user'
                            onChange={(e) =>
                                handleChange(
                                    e,
                                    setSelectedUsers,
                                    "Please select a user",
                                    "select user"
                                )
                            }
                        >
                            <option value="select a user">Select a User</option>
                            {users?.map((item) => {
                                return (
                                    <option value={item.id} key={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {selectedUsers ?
                        <div>
                            <Map
                                selectedUser={selectedUsers}
                                Users={users}
                            />
                        </div> : <></>}
                    <div className="m-4">
                        <div className="flex flex-row items-center">
                            <label type="text"
                                className="text-xl text-fuchsia-50"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                className='rounded-full border-2 border-black w-72 h-10 m-2 text-center bg-slate-100'
                                value={title}
                                variant="title"
                                onChange={(e) => handleChange(e, setTitle, "Empty Title", "")}
                                placeholder="Enter title"
                            />
                        </div>
                        {error?.title !== ""
                            &&
                            <div className='flex flex-row items-center'>
                                <FiAlertCircle color='white' />
                                <p className="text-white ml-2">{error.title}</p>
                            </div>
                        }
                    </div>

                    <div className="m-2">
                        <div className="flex flex-row items-center">
                            <label type="text"
                                className="text-xl text-fuchsia-50"
                            >
                                Body
                            </label>
                            <input
                                type="text"
                                className='rounded-full border-2 border-black w-72 h-10 m-2 text-center bg-slate-100'
                                value={body}
                                variant="body"
                                onChange={(e) => handleChange(e, setBody, "Empty Body", "")}
                                placeholder="Enter Body"
                            />
                        </div>
                        {error?.body !== "" &&
                            <div className='flex flex-row items-center'>
                                <FiAlertCircle color='white' />
                                <p className="text-white ml-2">{error.title}</p>
                            </div>}
                    </div>
                    <button
                        className="m-6 flex flex-row items-center w-36 justify-center bg-green-700 rounded-3xl hover:bg-green-800 py-2 tracking-wide text-white "
                        type="submit"
                        onClick={(e) => handleSubmit(e)}>
                        <div className="">Submit</div>
                    </button>
                </form>
                :
                <div className='flex flex-col items-center justify-center text-white text-4xl p-8 bg-slate-800 m-6 rounded-xl shadow-lg shadow-slate-400'>
                    Response Sent
                </div>
            }
        </div>
    )
}

export default FormControl