import React, { useEffect, useState } from 'react';
import Form from './Form';
import { useForm } from "react-hook-form";
import Mapp from './Mapp';

const Form_Control = () => {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState();
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])




    const handleOnchange = e => {
        setUserName(e.target.value);
    }
    console.log(users);
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="userName">User Name: </label>
                <input placeholder='select user name' onChange={handleOnchange} list="name" className=' py-1 px-2 m-2' /><br />
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" id="" {...register("title", { required: true })} className=' py-1 px-2 ms-5 my-2' required /><br />

                <label htmlFor="body">Body: </label>
                <input type="text" name="body" id="" {...register("body", { required: true })} className=' py-1 px-2 ms-5 my-2' required /><br />
                <button type="submit" className='btn btn-danger'>Submit</button>
            </form>
        </>
    );
};

export default Form_Control;