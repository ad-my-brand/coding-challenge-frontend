import { useState, useEffect } from "react"
import styles from "../styles/Home.module.css";

import dynamic from "next/dynamic";
import FormControl from "../components/formControl"

const MyMapComponent = dynamic(() => import('../components/map'), { ssr: false });

export default function Home() {
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
        setError(e);
      }
    }
    getData();
  }, []);
  const postIt = async () => {

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
    }
    catch (e) {
      setError(e);
    }
  }
  return (
    <>
      <div>
        <form className={styles.form}>
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
        </form>
      </div>
      <div className={styles.error}>
        {error}
      </div>
    </>
  )
}
