import React, { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
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
            <div className="my-5 mx-5 d-flex justify-content-center">
                <Form />
            </div>
        </>
    );
}

export default App;
