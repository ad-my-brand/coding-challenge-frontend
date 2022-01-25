import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Wrapper } from "@googlemaps/react-wrapper";
import FormComponent from "./FormComponent";
import Map from "./Map";

function App() {
  const [users, setUsers] = useState();
  const [userId, setuserId] = useState(0);
  const [title, settitle] = useState();
  const [body, setbody] = useState();

  const submit = (e) => {
    e.preventDefault();

    if (userId === 0) {
      alert("please select a user")
      return
    }

    console.log({
      userId,
      title,
      body,
    });

    axios.post("https://jsonplaceholder.typicode.com/users", {
      userId,
      title,
      body,
    })
    .then(function (response) {
      alert(
        "Request Sent\n" + "userId: " + userId + "\ntitle: " + title + "\nbody: " + body)
    })
    .catch(function (error) {
      alert("Form Couldn't submit with error: " + error.message)
    });

    setuserId("Select User");
    settitle("");
    setbody("");
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(
          res.data.map((i) => {
            return {
              user: i.name,
              userId: i.id,
              address: i.address,
            };
          })
        );
      })

      .catch((err) => console.log(err));
  }, []);

  // const position = [51.505, -0.09]
  const att = `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`

  const center = [28.546903713353448, 77.2307783757004];

  return (
    <div className="App">
      <div className="container">
        <h1>Coding Challenge Frontend: Swaraj Saxena</h1>
        <div className="divider"></div>
        <form onSubmit={submit} className="form">
          {/* {console.log(users)} */}
          <FormComponent
            label="User"
            formType={{ type: "select", options: users }}
            onchange={setuserId}
            value={userId}
          />
          <FormComponent
            onchange={settitle}
            label="Title"
            formType={{ type: "text" }}
            value={title}
          />
          <FormComponent
            onchange={setbody}
            label="Body"
            formType={{ type: "text" }}
            value={body}
          />
          <button
            // data-disable={}
            type="submit"
          >
            Submit
          </button>
        </form>
        <Wrapper apiKey={""}>
          <Map/>
        </Wrapper>
      </div>
    </div>
  );
}

export default App;

