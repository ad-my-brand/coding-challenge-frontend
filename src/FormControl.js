import React, { useState, useEffect } from "react";
import "./formControl.css";

const FormControl = () => {
  const [data, setdata] = useState([]);

  const [title, settitle] = useState();

  const [body, setbody] = useState();

  const [field, setfield] = useState(false);

  const getuser = async () => {
    const responce = await fetch("https://jsonplaceholder.typicode.com/users");
    setdata(await responce.json());
  };

  useEffect(() => {
    getuser();
  });
  const gettitle = (e) => {
    settitle(e.target.value);
  };
  const getbody = (e) => {
    setbody(e.target.value);
  };

  const postdata = async (event) => {
    event.preventDefault();
    console.log("Clicked");
    if (title && body) {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              body,
            }),
          }
        );
        const result = await response.json();
        settitle("");
        setbody("");
        alert("Your data add successfully");
        console.log("This is result", result);
      } catch (err) {
        console.log("This is error", err.message);
      }
    } else {
      setfield(!field);
    }
  };

  return (
    <div>
      <div className="home">
        <div className="users">
          <div className="list">
            <h1 className="font-weight-bold text-transform-capitalize">
              Name of Peoples
            </h1>
            {data.map((d) => {
              return <p>{d.name}</p>;
            })}
          </div>
        </div>
        <div className="section">
          <div className="form">
            <form method="post">
              <ul>
                <li>
                  <label>title</label>
                  <br />
                  <input
                    type="text"
                    placeholder="title"
                    onChange={gettitle}
                    value={title}
                  />
                  {field && <p className="error">field is required</p>}
                </li>
                <li>
                  <label>body</label>
                  <br />
                  <input
                    type="text"
                    placeholder="body"
                    onChange={getbody}
                    value={body}
                  />
                  {field && <p className="error">field is required</p>}
                </li>
                <li>
                  <input type="submit" onClick={postdata} />
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormControl;
