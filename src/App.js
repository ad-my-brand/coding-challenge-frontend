import React, { useState } from "react";

import FormControl from "./components/FormControl/FormControl";
import Record from "./components/Record/Record";
import "./App.css";

function App() {
  const [formError, setFormError] = useState("");
  const [error, setError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [formButtonDisabled, setFormButtonDisabled] = useState(false);
  const [records, setRecords] = useState("");

  const [values, setValues] = useState({
    title: "",
    body: "",
    userId: "",
  });

  const getAllData = () => {
    setButtonDisabled(true);
    setRecords([]);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(async (res) => {
        setButtonDisabled(false);
        const data = await res.json();
        if (data?.length === 0) {
          setError("No data found");
          return;
        }

        const result = data.map((item, i) => <Record key={i} {...item} />);
        setRecords(result);
      })
      .catch((err) => {
        setButtonDisabled(false);
        setError("Error connecting to server");
      });
  };

  const submission = (e) => {
    e.preventDefault();

    if (!values.title || !values.body || !values.userId) {
      setFormError("All fields are required");
      return;
    }

    setFormButtonDisabled(true);
    setFormError("");
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(async (res) => {
        setFormButtonDisabled(false);
        if (res.status > 400) {
          setFormError("Something went wrong please try later");
          return;
        }
        setFormError(
          <p style={{ color: "var(--secondary-color)" }}>
            All okay. Entry created
          </p>
        );
      })
      .catch((err) => {
        setFormButtonDisabled(false);
        setFormError("Error connecting to server");
      });
  };

  return (
    <div className="App">
      <form onSubmit={submission} className="semi-transparent">
        <FormControl
          label="Title"
          onChange={(e) => {
            const value = e.target.value;
            const myValues = { ...values };
            myValues.title = value;
            setValues(myValues);
          }}
          placeholder="Enter title"
        />

        <FormControl
          label="Body"
          onChange={(e) => {
            const value = e.target.value;
            const myValues = { ...values };
            myValues.body = value;
            setValues(myValues);
          }}
          placeholder="Enter body"
        />
        <FormControl
          label="User ID"
          onChange={(e) => {
            const value = e.target.value;
            const myValues = { ...values };
            myValues.userId = value;
            setValues(myValues);
          }}
          placeholder="Enter userID"
        />

        <small
          style={{
            fontSize: "0.9rem",
            color: "#ff4500",
            fontWeight: "bolder",
            display: "block",
            maxWidth: "290px",
            textAlign: "center",
            margin: "auto",
          }}
        >
          {formError}
        </small>
        <button
          disabled={formButtonDisabled}
          className={`button ${formButtonDisabled ? "button-disabled" : ""}`}
          type="submit"
        >
          Submit
        </button>
      </form>

      <button
        disabled={buttonDisabled}
        onClick={getAllData}
        className={`button ${buttonDisabled ? "button-disabled" : ""}`}
      >
        Get All Records
      </button>
      <small
        style={{
          fontSize: "1rem",
          color: "#ff4500",
          fontWeight: "bolder",
          display: "block",
          textAlign: "center",
          margin: "auto",
        }}
        className="semi-transparent"
      >
        {error}
      </small>
      {records}
    </div>
  );
}

export default App;
