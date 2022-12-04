import React from "react";
import FormControl from "./FormControl";

function Users() {
  const [users, setUsers] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  function validate() {
    if (!title || !body || !userId) {
      alert("Please fill out all fields");
      return false;
    }
    return true;
  }

  function handleFormDataPost(e) {
    e.preventDefault();

    const formData = { title, body, userId };
    // console.log("FORM DATA", formData);
    if (!validate(formData)) {
      console.log("Form has errors.");
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Posted with data: ${JSON.stringify(formData)}`);
        setPosts([...posts, data]);
      });
  }

  return (
    <div className="users">
      <form className="form" onSubmit={handleFormDataPost}>
        <FormControl
          label="Title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormControl
          label="Body"
          type="text"
          placeholder="Enter body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <FormControl
          label="User ID"
          as="select"
          value={userId}
          data={users}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit" className="form-button">
          Post
        </button>
      </form>

      <h2 className="users-heading">Posts</h2>
      <p className="users-subtext">
        Don't know where to put Google map so discarded that part, rest is here.
      </p>
      <div className="users-posts">
        {posts.map((post) => (
          <div className="users-post" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>-by {users[post.userId - 1].name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
