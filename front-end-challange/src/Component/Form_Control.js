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



    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(data);
        reset()
    }

    console.log(watch("example"));




    const handleOnchange = e => {
        setUserName(e.target.value);
    }
    console.log(users);
    // const handleForm = e => {
    //    
    //     console.log();
    //     e.preventDefault();
    // }
    // console.log(handleForm);
    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="userName">User Name: </label>
                <input placeholder='select user name' onChange={handleOnchange} list="name" className=' py-1 px-2 m-2' /><br />
                <datalist id="name">
                    {
                        users.map(user => (
                            <Form
                                key={user.id}
                                user={user}

                            >
                            </Form>
                        ))
                    }
                </datalist>
                <label htmlFor="userId">User Id: </label>
                {
                    users.filter(usId => usId.name === userName).map(no => (
                        <input type="number" name="" id="" className=' py-1 px-2 ms-4 w-25%' key={no.id} value={no.id} {...register("userId")} />))
                } <br />
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" id="" {...register("title", { required: true })} className=' py-1 px-2 ms-5 my-2' required /><br />
                <div className='mx-auto d-block'>
                    {
                        users.filter(usId => usId.name === userName).map(singleUser => (
                            <Mapp
                                key={singleUser.id}
                                user={singleUser.address}
                            >

                            </Mapp>

                        ))
                    }
                </div>
                <label htmlFor="body">Body: </label>
                <input type="text" name="body" id="" {...register("body", { required: true })} className=' py-1 px-2 ms-5 my-2' required /><br />
                <button type="submit" className='btn btn-danger'>Submit</button>
            </form>

        </>
    );
};

export default Form_Control;