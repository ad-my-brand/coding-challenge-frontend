import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'

const Form = () => {
    const { register, handleSubmit, formState: { errors } , reset} = useForm();
    const [option, setOption] = useState({});
    const [postError, setPostError] = useState("");
    const { data = [] } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
            const data = await res.json();
            return data;
        }
    });

    const handleChange = id => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json())
            .then(data => setOption(data));
    }

    const handleOnSubmit = data => {

        const postData = {
            "title": data.title,
            "body": data.body,
            "userId": option.id
        };

        fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    console.log(data);
                    toast.success('Data Inserted Successfully');
                    reset();
                    setOption({});
                }
            })
            .catch(error => setPostError(error.message));


    }


    return (
        <div className='flex justify-center mt-10'>
            <form onSubmit={handleSubmit(handleOnSubmit)} className="card flex-shrink-0 w-1/4 shadow-2xl bg-base-300">
                <div className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select User</span>
                        </label>
                        <select {...register('select', { required: "Please select a user", onChange: (e) => { handleChange(e.target.value) } })} className="input input-bordered">
                            <option selected value="">
                                Choose an option
                            </option>
                            {
                                data.map(dt => <option
                                    key={dt.id}
                                    value={dt.id}
                                >{dt.name}</option>)
                            }
                        </select>
                        {errors.select && <p role="alert" className='text-error'>{errors.select?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" defaultValue={option.email} placeholder="email" className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <div className='items-center justify-center gap-3'>
                            <input type="text" defaultValue={option?.address?.city} placeholder="address" className="input input-bordered w-full" readOnly />
                            {
                                option.id && <Link to={`/map/${option.id}`}><button className='mt-3 flex font-bold text-base-300 btn bg-gradient-to-tr from-red-600 to-yellow-300 hover:from-orange-600 hover:to-yellow-200'>See in Map
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>

                                </button></Link>
                            }
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input type="text" defaultValue={option.phone} placeholder="phone" className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input {...register('title', { required: "Please add a title" })} type="text" placeholder="title" className="input input-bordered" />
                        {errors.title && <p role="alert" className='text-error'>{errors.title?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Body</span>
                        </label>
                        <input {...register('body', { required: "Please Enter Body" })} type="text" placeholder="body" className="input input-bordered" />
                        {errors.body && <p role="alert" className='text-error'>{errors.body?.message}</p>}
                    </div>
                    <input className='mt-3 font-bold text-base-300 btn bg-gradient-to-tr from-red-600 to-yellow-300 hover:from-orange-600 hover:to-yellow-200' type="submit" value="Submit" />
                    {postError && <p role="alert" className='text-error'>{postError}</p>}
                </div>
            </form>
        </div>
    );
};

export default Form;