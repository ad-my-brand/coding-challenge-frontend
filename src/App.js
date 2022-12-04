import React from "react";
import "./App.css";
import FormControl from "./components/FormControl";
import Users from "./components/Users";

function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleFormDataSubmit(e) {
    e.preventDefault();

    const formData = { email, password };
    if (validate(formData)) {
      alert(`Form submitted with data: ${JSON.stringify(formData)}`);
    } else {
      console.log("Form has errors.");
    }
  }

  function validate(formData) {
    const { email, password } = formData;
    if (!email || !password) {
      alert("Please fill out all fields");
      return false;
    }
    if (!checkValidEmail(email)) {
      alert("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }
    return true;
  }

  function checkValidEmail(email) {
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(email);
  }

  return (
    <div className="app">
      <div className="app-task">
        <h1 className="app-header">Task 1</h1>
        <form className="form" onSubmit={handleFormDataSubmit} noValidate>
          <FormControl
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
      <div className="app-task">
        <h1 className="app-header">Task 2</h1>
        <Users />
      </div>
    </div>
  );
}

export default App;
