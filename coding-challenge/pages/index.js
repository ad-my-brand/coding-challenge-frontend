import { useState, useEffect } from "react"
import styles from "../styles/Home.module.css";

import dynamic from "next/dynamic";
import FormControl from "../components/formControl"

const MyMapComponent = dynamic(() => import('../components/map'), { ssr: false });

export default function Home() {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState("");
  const [selectedUser, setSelectedUser] = useState(-1);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const url = "https://jsonplaceholder.typicode.com/users";
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
      }
      catch (e) {
        setError(e.message);
      }
    }
    getData();
  }, []);
  const postIt = async () => {
    setMessage("");
    if (title.length === 0 || body.length === 0 || selectedUser === -1) {
      setError("Please fill all the fields");
      return;
    }
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          userId: selectedUser + 1,
          title,
          body
        })
      });
      setTitle("");
      setBody("");
      setMessage("Post added successfully");
    }
    catch (e) {
      setError(e.message);
    }
  }
  return (
    <>
      <div>
        <form className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          <FormControl
            type="select"
            options={users}
            onChange={(e) => setSelectedUser(e.target.value - 1)}
            label="Select User"
            validation={() => {
              if (selectedUser === -1) {
                return "Please select a user";
              }
              return "";
            }}
          />

          {selectedUser !== -1 && <MyMapComponent location={[users[selectedUser].address.geo.lat, users[selectedUser].address.geo.lng]} />}

          <FormControl type="text" label="Title" value={title} onChange={setTitle} validation={() => title.length == 0 && "Enter Title"} />
          <FormControl type="text" label="Body" value={body} onChange={setBody} validation={() => body.length == 0 && "Enter Body"} />
          <FormControl type="submit" label="Post" onChange={postIt} />
          {message && <div data-testid="message" className={styles.message}>{message}</div>}
        </form>
      </div>
    </>
  )
}
