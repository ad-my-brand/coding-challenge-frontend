import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from '@tanstack/react-query'
import Gmap from '../Gmap'
import PostData from '../PostData';

const FormControl = () => {
    const { register, watch } = useForm();
    const [myVal, setMyVal] = React.useState()
    const [user, setUser] = useState();
    const fruits = register("fruits");

    const { data: users = [], refetch } = useQuery({
        queryKey: 'name',
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await res.json();
            return data;
        }
    })


    useEffect(() => {
        users.map(user => {
            const currentName = user.name;
            if (myVal && myVal === currentName) {
                setUser(user);
            }
        });
    }, [myVal, users])

    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='text-3xl font-bold text-orange-400 my-6' >Assignment task from ADmyBRAND India</h1>
            <div className="App mb-8">
                <h1>{myVal}</h1>
                <select className="select rounded-md select-success w-full" onChange={(e) => { fruits.onChange(e); setMyVal(e.target.value); }}>
                    {
                        users?.map(user =>
                            <option defaultValue={''} key={user?.id} value={user?.name}>{user?.name}</option>
                        )
                    }
                </select>
            </div>
            <Gmap user={user}></Gmap>
            <PostData user={user}></PostData>
        </div>
    );
};

export default FormControl;