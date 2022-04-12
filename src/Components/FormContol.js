import React, { useState, useEffect } from "react";
import GMaps from "./GMaps";
import axios from "axios";
import "./../Style/FormControl.css"
import Navbar from "./Navbar";
export default function FormControl() {
    const [users, setusers] = useState([]);
    const [isSubmitted, setSubmitted] = useState(false);
    const [geo, setGeo] = useState({ lat: -37.3159, lon: 81.1496 })
    const [initialValues, setInitialValues] = useState({
        userId: "",
        title: "",
        body: "",
    });
    //Run at start
    useEffect(() => {
        getUsers();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInitialValues((data) => {
            return { ...data, [name]: value };
        });
    };

    const handleSelect = (value, name) => {
        setInitialValues((data) => {
            return { ...data, [name]: value };
        });


        try {
            setGeo({ lat: users[value].address.geo.lat, lon: users[value].address.geo.lng })

        } catch (error) {
            setGeo({ lat: -38.2386, lon: 57.2232 })

        }


    };

    //Get all the users from api
    const getUsers = () => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users`)
            .then((res) => {
                const data = res.data;
                setusers(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    //post request
    const postData = (e) => {
        axios
            .post(`https://jsonplaceholder.typicode.com/posts`, initialValues)
            .then((res) => {
                setSubmitted(true);
                //this will reset the form fields
                setInitialValues({ title: "", body: "" });
                document.getElementById("errorMsg").style.display = "block"
            })
            .catch((error) => {
                console.log(error);
                setSubmitted(false);
            });
        e.preventDefault();
    };


    return (
        <>
        <Navbar/>
        <div className="container">
            <div className="formContainer">
                <h1>FORM</h1>
                <form onSubmit={postData
                }>
                    <div className="input">
                        <label htmlFor="title">Title</label>
                        <input
                            minLength="3"
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Please Enter Title"
                            value={initialValues.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="body">Body</label>
                        <input
                            minLength="3"
                            type="text"
                            id="body"
                            name="body"
                            placeholder="Please Enter Body"
                            value={initialValues.body}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="select">
                        <label htmlFor="userId">Select User</label>
                        <select value={initialValues.userId} name="userId" id="userId" onChange={
                            (e) => {
                                const { name, value } = e.target;
                                handleSelect(value, name);
                            }}>
                            {users.map((user, index) => {
                                return (
                                    <option key={index} value={user.id}>
                                        {user.name}
                                    </option>

                                );
                            })}
                        </select>
                    </div>

                    <button type="submit">Submit</button>
                    {isSubmitted ? (
                        <div className="submitMsg">Form Submission Successful</div>
                    ) : (
                        <div className="errorMsg" id="errorMsg" style={{ display: "none" }}>Form Submission Failed</div>
                    )}

                </form>
            </div>
            <div>
                <GMaps lat={geo.lat} lon={geo.lon} />
            </div>
        </div>

        </>
    );
}