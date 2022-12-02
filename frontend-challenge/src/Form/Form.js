import React from 'react';
import Location from '../Location/Location';

const Form = ({ d }) => {
    // console.log(d)
    const handleForm = event => {
        event.preventDefault();
        const form = event.target;
        const id = form.id.value;
        const todos = form.todos.value;
        const body = form.body.value;
        const info = {
            id, todos, body
        }
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({info})
        })
        .then(res => res.json())
        .then(data=>{
            console.log(data)
        })

    }
    return (
        <form onSubmit={handleForm}>
            <div className="m-5 rounded shadow-xl">
                <div className="card-body">
                    <h2 className="card-title"><strong>Name: </strong>{d.name}</h2>
                    <strong className='ml-5'>Id: </strong>
                    <input type="text" name='id' defaultValue={d.id} disabled placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <strong className='ml-5'>Todos: </strong>
                    <input type="text" name='todos' placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <strong className='ml-5'>Body: </strong>
                    <textarea className="textarea input input-bordered w-full" name='body' placeholder="Bio"></textarea>
                    <Location></Location>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary text-white">Submit</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Form;