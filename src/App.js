import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
      <div className="bg-indigo-100 App min-h-screen">
        <div className=" flex flex-col space-y-2">
          <Navbar />
          <UserForm/>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;


