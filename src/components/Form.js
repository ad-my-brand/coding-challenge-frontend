import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FormControl from './FormControl'

const Form = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState("default")
    const [title, setTitle] = useState()
    const [body, setBody] = useState()

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, [])

    // useEffect(() => {
    //     console.log(user)
    // })


    const handleUserChange = (e) => {
        setUser(e.target.value)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }

    const post = async (response) => {
        await axios.post('https://jsonplaceholder.typicode.com/posts', response)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user === 'default')
            alert("Please enter a user")
        else if (!title)
            alert("Title cannot be empty")
        else if (!body)
            alert("Body cannot be empty")
        else {
            const response = {
                title: title,
                body: body,
                userId: user
            }
            post(response)
            // console.log(response)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <select id="user" onChange={handleUserChange}>
                <option value="default">Select a user</option>
                {users?.map(
                    user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    )
                )}
            </select>
            <input placeholder='Title' onChange={handleTitleChange} />
            <input placeholder='Body' onChange={handleBodyChange} />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Form