import axios from 'axios'
import React, { useState } from 'react'


const FormControl = () => {
    const [state, setState] = useState({
        userId: "",
        title: "",
        body: ""
    })

    const changeHandler = e => {
            setState({ ...state, [e.target.name]: e.target.value })
            
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post('https://jsonplaceholder.typicode.com/posts', {...state})
            .then(res => console.log(res))
            .catch(err => console.log(err))

        setState({
            userId: "",
            title: "",
            body: ""
        })    
    }

    return (
        <div className='Form__Container'>
            <form onSubmit={submitHandler}>
                <div className='form__Container'>
                    <label htmlFor="userId">UserName : </label>
                    <input
                        type="text"
                        name="userId"
                        value={state.userId}
                        placeholder='Enter userID'
                        onChange={changeHandler}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='form__Container'>
                    <label htmlFor="title">Title : </label>
                    <input
                        type="text"
                        name="title"
                        value={state.title}
                        placeholder='Enter Title'
                        onChange={changeHandler}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='form__Container'>
                    <label htmlFor="body">Body : </label>
                    <input
                        type="text"
                        name="body"
                        value={state.body}
                        placeholder='Enter Body'
                        onChange={changeHandler}
                        required
                        autoComplete='off'
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default FormControl