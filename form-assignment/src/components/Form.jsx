import React, { useEffect, useState } from 'react'
import FormControl from './FormControl'
import Map from './Map';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/Form.css'

const Form = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [user, setUser] = useState([])
    const [userId, setUserId] = useState()
    const [pos, setPos] = useState()
    const [error, setError] = useState("");
    const [titleErr, setTitleErr] = useState(false);
    const [bodyErr, setBodyErr] = useState(false);

    const handleAPI = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        handleAPI();
    }, [user])

    const handleUserChange = (e) => {
        console.log(e.target.value)
        setUserId(e.target.value);
        const lat = user[userId]?.address?.geo?.lat;
        const lng = user[userId]?.address?.geo?.lng;
        setPos([parseFloat(lat), parseFloat(lng)])
        // console.log(pos)
    }
    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };

    const handleBodyChange = (newBody) => {
        setBody(newBody);
    };

    const validateUser = (uId) => {
        if (uId !== "30" || uId !== "") return true;
    };

    const validateTitle = (value) => {
        if (value === "") {
            setTitleErr(true)
            return false
        }
        setTitleErr(false)
        return true
    };
    const validateBody = (value) => {
        if (value === "") {
            setBodyErr(true)
            return false
        }
        setBodyErr(false)
        return true
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bodyErr);
        if (userId == "30") {
            setError("Select a User!");
        }

        if (
            validateUser(userId) &&
            validateTitle(title) &&
            validateBody(body)
        ) {
            const postData = {
                title: title,
                body: body,
                userId: parseInt(userId),
            };
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            })
                .then((response) => response.json())
                .then((data) => {
                    toast.success("New post created!");
                    console.log("New post : ", data);
                    setTitle("");
                    setBody("");
                    setUser([]);
                })
                .catch((error) => toast.error("Error creating post"));
        } else {
            toast.error("Fill all the fields!");
        }
    };



    return (
        <div className='main-div'>
            <Map position={pos} city={user?.find((item) => item?.id === userId)?.address?.city} />
            <form className='form-control' onSubmit={handleSubmit}>
                    <div className='form-user-name'>
                        <label htmlFor="" className='username'>Select an user</label>
                        <select className='dropdown' onChange={handleUserChange}>
                            <option value="30">Select an user</option>
                            {user.map((item, id) => (
                                <option key={id} value={id}>{item.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-user-inputs'>
                        <FormControl
                            label="Title:"
                            validation={validateTitle}
                            errorMessage="Please enter a title!!"
                            onChange={handleTitleChange}
                        />
                        {titleErr && <p className="error-msg">Enter a Title!</p>}

                        <FormControl
                            label="Body:"
                            validation={validateBody}
                            errorMessage="Please enter a body!!"
                            onChange={handleBodyChange}
                        />
                        {bodyErr && <p className="error-msg">Enter a Body!</p>}
                    </div>
                
                <section className='form-submit-btn'>
                    <button className="submit-btn">Submit</button>
                </section>
            </form>
        </div>
    )
}

export default Form
