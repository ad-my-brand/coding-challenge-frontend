import React from 'react'
import {useState,useEffect} from "react";
import axios from "axios";
const UserList = () => {

    const [users,setUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsers();
    },[])

  return (
    <div>
    <h2>Available Users</h2>
        {
            users.map((user) => {
                return (
                    <p>{user.name}</p>
                )
            })
        }
    </div>
  )
}

export default UserList