import { useEffect, useState } from "react"

const FormControl = () => {

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState('');

    const [titleBody, setTitleBody] = useState({
        title: "",
        body: ""
    });

    useEffect(() => {
        fetch(`api/getUsers`).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data.data);
            setUsers((prev) => {
                return data.data
            })
        })
    }, [])

    function sendData(e) {
        e.preventDefault();
        // console.log(document.querySelectorAll(`${e.target} select`));
        const payload = {
            title: titleBody.title,
            body: titleBody.body,
            userId: selectedUser
        };

        fetch(`api/sendUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
        })
    }

    function handleChange(e) {
        setTitleBody((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <>
            <form onSubmit={sendData}>
                <label htmlFor="user">Users</label>
                <select name="user" id="user" onChange={(e) => { setSelectedUser(e.target.value) }} required={true}>
                    <option value="" disabled={true} selected={true}>Select a user</option>
                    {users.map((user, index) => {
                        return <option key={index} value={user.id}>{user.name}</option>
                    })}
                </select>

                <div className="error-msg" style={{ display: 'none' }}>Please select a user</div>

                <input type="text" name="title" id="title" placeholder="Title" required={true} onChange={handleChange} />
                <input type="text" name="body" id="body" placeholder="Body" required={true} onChange={handleChange} />

                <input type="submit" value="Submit" />

            </form>

            <iframe width="600" height="450" style={{ "border": 0, "margin": '3rem 0' }} loading="lazy" allowFullScreen src={`https://www.google.com/maps/embed/v1/place?q=${selectedUser !== '' ? users[selectedUser - 1].address.city : 'india'}&key=${process.env.NEXT_PUBLIC_API_KEY}`}></iframe>
        </>
    )
}

export default FormControl