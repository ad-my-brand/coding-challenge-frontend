import "./index.css";
import FormControl from "./components/FormControl";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [location, setLocation] = useState({ lat: "", lng: "" });

    const fetchUsers = async () => {
        const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        console.log(data);
        setUsers(data);
        console.log(data);
    };

    const onSubmit = async (e) => {
        if (!selectedUser) return alert("Select An User");
        if (title === "" || body === "") {
            alert("Please fill all the fields");
            return;
        } else {
            e.preventDefault();
            try {
                const { data } = await axios.post(
                    "https://jsonplaceholder.typicode.com/users",
                    {
                        title,
                        body,
                    }
                );
                setUser({ ...data, name: users[selectedUser - 1].name });
            } catch (error) {
                alert(JSON.stringify(error));
            }
        }
    };

    const locationCHange = (e) => {
        console.log(e.target.value);
        if (e.target.value === "null" || e.target.value === "Select User") {
            setSelectedUser(null);
            return;
        }
        setSelectedUser(e.target.value);
      
        setLocation({
            lat: parseInt(users[e.target.value].address.geo.lat),
            lng: parseInt(users[e.target.value].address.geo.lng),
        });
    };
    const mapURL =
        "https://maps.google.com/maps?q=" +
        location.lat +
        "," +
        location.lng +
        "&z=15&output=embed";

    useEffect(() => {
        fetchUsers();
    }, []);
    const validateEmpty = (value) => value !== "";
    return (
        <div>
            <form
                className="p-4 mx-auto md:w-1/3"
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
                onSubmit={onSubmit}
            >
                <div>
                    <select
                        className="cursor-pointer border-none focus:outline-none focus:border-none focus:ring-0"
                        name="userId"
                        id="userId"
                        onChange={locationCHange}
                    >
                        <option defaultValue={null}>Select User</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {" "}
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <div className="" style={{ width: "fit-content", marginTop:"20px" }}>
                        <iframe
                            src={mapURL}
                            width="500"
                            height="400"
                            allowfullscreen=""
                            loading="lazy"
                            title="map"
                        ></iframe>
                    </div>
                </div>
                <div style={{ width: "40%" }}>
                    <FormControl
                        label={"Title"}
                        value={title}
                        setValue={setTitle}
                        validate={validateEmpty}
                    />
                    <FormControl
                        label={"Body"}
                        value={body}
                        setValue={setBody}
                        validate={validateEmpty}
                    />

                    <button className="bg-blue-600 px-4 py-1 text-white text-md rounded-lg hover:bg-blue-500 mx-8">
                        Submit
                    </button>
                </div>
            </form>
            {user && (
                <div className="m-8">
                    <div>Name : {user.name}</div>
                    <div>Title: {user.title}</div>
                    <div>Body : {user.body}</div>
                </div>
            )}
        </div>
    );
}

export default App;
