import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FormControl from './FormControl'
import MapComp from './MapComp'

const Form = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState("default")
    const [userGeo, setUserGeo] = useState({})
    const [title, setTitle] = useState()
    const [body, setBody] = useState()
    const [displayDefault, setDisplayDefault] = useState(true)

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                console.log("200: SUCCESSFUL IN FETCHING USERS LIST")
                setUsers(res.data)
            })
            .catch(err => alert("500 : INTERNAL SERVER ERROR"))
    }, [])

    // useEffect(() => {
    //     console.log(user)
    // })

    const isValid = (label, id) => {
        if (label && id)
            return true
        else
            return false
    }

    const handleUserChange = (e) => {
        setDisplayDefault(false)
        setUser(e.target.value)
        for (const key in users) {
            if (users[key].id == e.target.value) {
                setUserGeo(users[key].address.geo)
                // console.log(users[key])
            }
            // console.log(users[key].id)
        }
        // console.log(users.length)
        // for (let i = 0; i < users.length; ++i) {
        //     if (users[i].id == e.target.value) {
        //         setUserGeo(users[i].address.geo)
        //         console.log(users[i])
        //     }
        //     console.log(users[i])
        // }
        // console.log(user)
        // console.log(e.target.value)
        // console.log(userGeo)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }

    const post = async (response) => {
        await axios.post('https://jsonplaceholder.typicode.com/posts', response)
            .then(res => {
                console.log('201 : CREATED NEW POST')
                console.log(res.data)
            })
            .catch(err => console.log("500 : INTERNAL SERVER ERROR"))
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
        <>
            <form onSubmit={handleSubmit} className='Form'>
                <select id="user" onChange={handleUserChange}>
                    {displayDefault ? <FormControl label='Select an user' id='default' isValid={isValid} /> : <></>}
                    {users?.map(
                        (user, index) => (
                            // <option key={user.id} value={user.id}>{user.name}</option>
                            <FormControl key={index} label={user.name} id={user.id} isValid={isValid} />
                        )
                    )}
                </select>
                <textarea placeholder='Title' onChange={handleTitleChange} style={{ resize: 'vertical', height: 40, maxHeight: 80, width: 250, maxWidth: '100vw' }}></textarea>
                <textarea placeholder='Body' onChange={handleBodyChange} style={{ resize: 'vertical', height: 80, maxHeight: 200, width: 250, maxWidth: '100vw' }}></textarea>
                <button type='submit'>Submit</button>
            </form>
            {
                user !== 'default' ? <MapComp lat={parseFloat(userGeo.lat)} lng={parseFloat(userGeo.lng)} /> : <></>
            }
            {/* <MapComp /> */}
        </>
    )
}

export default Form