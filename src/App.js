import React, { useState } from "react";
import "./App.css";
import { LocationForm } from "./components/LocationForm";
function App() {
    const [greeting, setGreeting] = useState();
    const [name, setName] = useState();
    const inputEvent = e => {
        setName(e.target.value);
    };
    const onSubmit = e => {
        e.preventDefault();
        setGreeting(name);
    };
    return (
        <>
            <LocationForm />
        </>
    );
}

export default App;
