import React, { useEffect, useState } from 'react'

function Users() {
    const [data,setData]=useState([]);
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
          .then((response) => response.json())
          .then((actualData) => setData(actualData));
      }, []);
  return (
    <div>
        <ul>
            {data.map(item=> (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    </div>
  )
}

export default Users