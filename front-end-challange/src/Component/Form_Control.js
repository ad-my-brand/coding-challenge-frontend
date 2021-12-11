import React, { useEffect, useState } from 'react';
import Form from './Form';
import { useForm } from "react-hook-form";
import Mapp from './Mapp';
import swal from 'sweetalert';

const Form_Control = () => {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState();
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])



    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                // make response after post
                console.log(res);
                if (res.ok) {
                    swal("Good!", "Your Post Submitted Succesfully", "success");
                }
                if (res.status !== 201) {
                    swal({
                        title: "Something Wrong",
                        icon: "warning",
                        dangerMode: true,
                    })
                }
            })

    }
    const handleOnchange = e => {
        setUserName(e.target.value);
    }
    console.log(userName);


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='container border border-danger m-5 py-5'>
                <label htmlFor='UserName' className="text-danger fw-bold">User Name: </label>
                <select id="" className='py-1 px-2 m-2 w-25 border border-success rounded' required onChange={handleOnchange}>
                    <option selected disabled value="">Selec An User</option>

                    {
                        users.map(user => (
                            <Form
                                key={user.id}
                                user={user}

                            >
                            </Form>
                        ))
                    }
                </select><br />
                <label htmlFor="userId" className='text-danger fw-bold'>User Id: </label>
                {
                    users.filter(usId => usId.name === userName).map(no => (
                        <input type="number" name="" id="" className=' py-1 px-2 m-2 w-25 border border-success rounded' key={no.id} value={no.id} {...register("userId", { required: true })} />))
                } <br />
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
                <label htmlFor="title" className='text-danger fw-bold'>Title: </label>
                <input type="text" name="title" id="" {...register("title", { required: true })} className=' py-1 px-2 m-2 w-25 border border-success rounded' /> <br />
                {errors.title && <span className='text-danger my-3'>Title is required</span>}
                <br />
                <label htmlFor="body" className='text-danger fw-bold'>Body: </label>
                <input type="text" name="body" id="" {...register("body", { required: true })} className=' py-1 px-2 m-2 w-25 border border-success rounded' /><br />
                {errors.body && <span className='text-danger my-3'>body is required</span>}
                <br />
                <button type="submit" className='btn btn-danger'>Submit</button><br />
            </form>

        </div>
    );
};

export default Form_Control;