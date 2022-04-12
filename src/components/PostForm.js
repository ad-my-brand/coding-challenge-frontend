import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import FormControl from './FormControl';

const PostForm = () => {

    const [allUsers,setAllUsers] = useState([]);
    const [title,setTitle] = useState("");
    const [post,setPost] = useState("");
    const [user,setUser] = useState({});


    const getAllUsers = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            setAllUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/posts",{
                "title":title,
                "body":post,
                "userId":user.id
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const titleValidation = (input) =>{
        if(input!== null)
        {
            return true;
        }
    }

    const postValidation = (input) =>{
        if(input!== null)
        {
            return true;
        }
    }

    const userValidation = (input) => {
        if(input !== null)
        {
            return true
        }
    }

    useEffect(() => {
        getAllUsers();
    },[]);

  return (
    <div className="form">
    <h2 className='display-5'>Make Post!</h2>
    <FormControl
    label = "Title"
    validationFunction={titleValidation}
    ErrorMessage = "Enter a valid title"
    callbackFunction={setTitle}
     />
    <FormControl
    label = "Post"
    validationFunction={postValidation}
    ErrorMessage = "Enter a valid post"
    callbackFunction={setPost}
    />
    <label htmlFor="user-select" className='form-label'>Select A User</label>
    <select 
    id = 'user-select'
    className='form-select'
    onClick={(e) => {
        userValidation(user)
    }}
    onChange={(e) => {
        setUser(e.target.value);
    }}
    value = {user}>
    {
        allUsers.map((user) => {
            return(
                <option value={user}>{user.name}</option>
            )
        })
    }
    </select>
    <br />
    <button className='btn btn-success'
    onClick={(e) => {
        handleSubmit(e)
    }}>Submit</button>
    </div>
  )
}

export default PostForm