import axios from "axios";
import { useEffect, useState } from "react";


const FormControl = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [user, setUser] = useState({});

  const mapURL = "https://maps.google.com/maps?q=" + location.lat + "," + location.lng + "&z=15&output=embed";

  const fetchUsers = async () => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
    setUsers(data);
    console.log(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (e) => {
    if (title === "" || body === "") {
      alert("Please fill all the fields");
      return;
    } else {
      e.preventDefault();
      const { data } = await axios.post("https://jsonplaceholder.typicode.com/users",
        {
          title,
          body,
        }
      );
      setUser(data);
    }
  };

  const locationCHange = (e) => {
    console.log("user", users[e.target.value - 1]);
    console.log("lat", users[e.target.value].address.geo.lat);
    setLocation({
      lat: parseInt(users[e.target.value].address.geo.lat),
      lng: parseInt(users[e.target.value].address.geo.lng),
    });
  };

  return (
    <div>
      <form className="p-4 mx-auto md:w-1/3" onSubmit={onSubmit}>
        <div className="px-8 py-4 shadow-lg rounded-md">
          <select
            className="cursor-pointer w-full border-none focus:outline-none focus:border-none focus:ring-0" name="userId" id="userId" 
            onChange={locationCHange}> 
            {users.map((user) => (
              <option key={user.id} value={user.id}> {user.name}</option>
            ))}
          </select>

          <div className=" first-letter:flex flex-col mb-2">
            <label className=" text-sm font-bold" htmlFor="title">Title</label>
            <input className=" text-sm rounded-md border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>

          <div className="flex flex-col mb-2">
            <label className="text-sm font-bold" htmlFor="body">Body</label>
            <input className="text-xs rounded-md border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600" 
              type="text" name="body" value={body} onChange={
                (e) => setBody(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 px-4 py-1 text-white text-md rounded-lg hover:bg-blue-500">
            Submit
          </button>
        </div>
      </form>

      {JSON.stringify(user) !== "{}" && <p>{JSON.stringify(user)}</p>}
      <div className="flex justify-center">
        <iframe src={mapURL} width="600" height="450" allowfullscreen="" loading="lazy"></iframe>
      </div>
    </div>
  );
};

export default FormControl;
