import { useEffect, useState } from 'react';
import './App.css';
import FormControl from './components/form control/FormControl';
import TextArea from './components/form control/TextArea';
import Map from './components/map/Map';

function App() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(0)
  const [alert, setAlert] = useState("")
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [geoLoc, setGeoLoc] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users").then(rawRes => rawRes.json()).then(finalRes => setUsers(finalRes)).catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    if (selectedUser != 0) {
      let long = parseFloat(users.find(e => e.id == selectedUser).address.geo.lng)
      let lat = parseFloat(users.find(e => e.id == selectedUser).address.geo.lat)
      setGeoLoc([long, lat])
    }
    else setGeoLoc([])
  }, [selectedUser])

  const handleSubmit = async e => {
    e.preventDefault()
    setAlert("")
    if (selectedUser == 0) return setAlert("Select a user")
    if (!title.trim() || !body.trim()) return setAlert("Incomplete Fields")
    try {
      const rawResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body, userId: selectedUser })
      });
      const content = await rawResponse.json();
      setAlert("Successfuly Posted")
    } catch (error) {
      console.log("We are having some issue, please try again later")
    }
  }

  return (
    <div className="App">
      <FormControl list={users} label="Select a User" setValue={setSelectedUser} />
      <div className="gridCol2">
        <div className="mapsContainer">{geoLoc.length > 0 ? <Map center={geoLoc} /> : <div id="map">{selectedUser == 0 ? "Select a user to view his/her location" : ''}</div>}</div>
        <form onSubmit={handleSubmit}>
          <TextArea label="Title" setValue={setTitle} value={title} />
          <TextArea label="Body" setValue={setBody} value={body} />
          <input type="submit" value="Submit" />
          {alert && <div className="alert">{alert}</div>}
        </form>
      </div>
    </div>
  );
}

export default App;
