import React, { useEffect, useState } from "react"
import classes from "./Form.module.css"
export default function Form() {
    const [nameid, setnameid] = useState("");
    const [title, settilte] = useState("");
    const [body, setbody] = useState("");
    const [users, setUsers] = useState([]);
    const fetchData = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUsers(data)
            })
    }
    console.log("ID", nameid)
    useEffect(() => {
        fetchData()
    }, [])

    const handleSumit = async (e) => {
        e.preventDefault();
        console.log("infunction")
        let payload = {
            title: title,
            body: body,
            userId: nameid
        }
        console.log("payload", payload)
        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => { return response.json() })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
 
    return (
        <div>
            <form  className={classes.container}>
                <div className={classes.dropdown}>

                    <select  onChange={e => setnameid(e.target.value)}>
                        {users.map(item => (
                            <option
                                key={item.name}
                                value={item.id}

                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={classes.containerLabel} >
                    <label>
                        Title:
                        <input type="text" onChange={(e) => { setbody(e.target.value) }} />
                    </label>
                    <label>
                        Body:
                        <input type="text" onChange={(e) => { settilte(e.target.value) }} />
                    </label>
                    <label>
                        <input type="submit" onClick={(e) => { handleSumit(e) }} />
                    </label>
                </div>
            </form>
        </div>
    )
}