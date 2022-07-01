import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Users() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((res) => setData(res.data))
            .catch(err => err)
    }, []);

    return (
        <div className='Users__Container'>
            <ul>
                {
                    data.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Users 