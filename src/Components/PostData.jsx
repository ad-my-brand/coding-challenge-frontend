import React from 'react';
import { useForm } from "react-hook-form";

const PostData = ({ user }) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const userInfo = {
            title: data?.name,
            body: data?.body,
            id: user?.id
        }
        fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.title && data.body && data.id) {
                    alert('Data posted successfully')
                } else {
                    alert('Request faield please try again')
                }
            })
    };
    return (
        <div className='my-20'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input defaultValue={user?.name} required {...register('name', { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full" />
                </div>
                {errors.name && <span className='text-red-500'>Please select a user</span>}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Body</span>
                    </label>
                    <input defaultValue={user?.email} required {...register('body', { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full" />
                </div>
                {errors.body && <span className='text-red-500'>Please select a user</span>}
                <input className='btn block btn-outline mt-3' type="submit" />
            </form>
        </div>
    );
};

export default PostData;