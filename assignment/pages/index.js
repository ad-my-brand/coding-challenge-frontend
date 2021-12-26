import { useState } from "react";
import FormControl from "../components/FormControl";

export async function getServerSideProps() {
  const req = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await req.json();
  return { props: { users: users } };
}

const textValidation = (value, label, maxSize) => {
  if (value.length === 0)
    return { valid: false, error: `${label} cannot be empty` };
  else if (value.length > maxSize)
    return {
      valid: false,
      error: `${label} cannot be more than ${maxSize} characters`,
    };
  return { valid: true, error: "" };
};

export default function Index({ users }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = [];
    if (title.length === 0) fields.push("title");
    if (body.length === 0) fields.push("body");
    const error = "Field(s) " + fields.toString() + " cannot be empty";
    if (user === undefined) {
      alert("Please select a user");
      return;
    }
    if (fields.length > 0) {
      alert(error);
      return;
    }
    const reqBody = { title: title, body: body, userId: user.id };
    if (
      textValidation(title, "", 64).valid &&
      textValidation(body, "", 256).valid
    )
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      }).then((res) => {
        if (res.status === 201) {
          alert("Post created");
          document.location.reload();
        } else if (res.status >= 500 && res.status < 600)
          alert("Server error occurred");
      });
    else alert("Resolve form errors before submitting");
  };
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col"></div>
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <form className="shadow p-5 rounded">
            <div className="mb-3">
              <h3>Create post</h3>
            </div>
            <FormControl
              id="usersId"
              label="User"
              type="select"
              options={users}
              validationFun={(value) => {
                return { valid: true, error: "" };
              }}
              onChangeFun={(value) => {
                const u = users.filter((user) => user.id == value)[0];
                setUser(u);
              }}
            />
            {user && user.address && (
              <div className="mb-3">
                <iframe
                  width="100%"
                  height="250"
                  src={`https://maps.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}&t=k&z=5&output=embed`}
                />
              </div>
            )}
            <FormControl
              id="titleId"
              placeholder="Enter post title"
              label="Title"
              type="text"
              validationFun={(value) => textValidation(value, "Title", 64)}
              onChangeFun={(value) => setTitle(value)}
            />
            <FormControl
              id="bodyId"
              placeholder="Enter post body"
              label="Body"
              type="textarea"
              validationFun={(value) => textValidation(value, "Body", 256)}
              onChangeFun={(value) => setBody(value)}
            />
            <div className="mb-3 text-end">
              <button
                className="btn btn-primary"
                id="btnSubmit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
