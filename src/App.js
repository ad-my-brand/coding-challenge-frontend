import React from "react";
import "./App.css";
import Formcontrol from "./components/Formcontrol";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <div>
      <NotificationContainer />

      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>
        React Coding Challenge
      </h1>
      <Formcontrol />
    </div>
  );
}

export default App;
