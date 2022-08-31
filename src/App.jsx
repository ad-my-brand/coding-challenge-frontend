import './App.css';
import FormControl from './FormControl';
import { useEffect, useState } from "react";
import Map from './Map';
import { Button, TextField } from '@mui/material';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    body: "",
    lat: 48.8584,
    lng: 2.2945
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await resp.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target
    if (name === "userId") {
      const user_ = users.find(user => user.id === parseInt(value))

      setFormData(prev => ({
        ...prev,
        [name]: value,
        lat: parseFloat(user_.address.geo.lat),
        lng: parseFloat(user_.address.geo.lng)
      }))
      return
    }
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setErrors({
      userId: !formData.userId,
      title: !formData.title,
      body: !formData.body
    })

    if (formData.userId && formData.title && formData.body) {
      const data = {
        userId: formData.userId,
        title: formData.title,
        body: formData.body
      }

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          setSubmitted(true)
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="AppContainer">
          <div className="select" id="item">
            <span>Select a user</span>
            <FormControl users={users} value={FormData.userId} handleChange={handleChange} />
            {errors.userId && <span>Select a user</span>}
          </div>
          <div className="title" id="item">
            <TextField
              name="title"
              label="Title"
              id="outlined-size-small"
              size="small"
              value={FormData.title} onChange={handleChange}
            />
            {errors.title && <span>Title required</span>}
          </div>
          <div className="body" id="item">
            <TextField
              id="outlined-textarea"
              placeholder="Body"
              multiline
              name="body"
              cols={6}
              rows={3}
              value={FormData.body}
              onChange={handleChange}
            />
            {errors.body && <span>Body required</span>}
          </div>
        </div>
        <div className="btn">
          <Button variant="contained" type={"submit"}>Submit</Button>
          {submitted && <span style={{ margin: "10px" }}>Done!!</span>}
        </div>
      </form>

      <div className="map" >
        <Map lat={formData.lat} lng={formData.lng} />
      </div>
    </div>
  );
}

export default App;