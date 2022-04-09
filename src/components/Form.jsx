import React, { useState, useEffect } from "react";
import axios from "axios";
import { Maps } from "./Maps";
export const Form = () => {
    const [names, setNames] = useState([]);
    const [selects, setSelects] = useState();
    const getNames = () => {
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                setNames(response.data);
            });
    };
    const renderMap = e => {
        e.preventDefault();
        const userToDisplay = names.filter(user => user.id == selects);
        const lat = userToDisplay[0].address.geo.lat;
        const lng = userToDisplay[0].address.geo.lng;
        console.log(lat, lng);
    };
    useEffect(() => {
        getNames();
    }, []);
    return (
        <>
            {/* <form onSubmit={renderMap}>
                <label className="my-3 h3">Select a user</label>
                <h1>{selects}</h1>
                <select
                    className="form-select"
                    aria-label="Default select example"
                    value={selects}
                    onChange={e => setSelects(e.target.value)}
                >
                    <option selected>--Select--</option>
                    {names.map(name => {
                        return <option value={name.id}>{name.name}</option>;
                    })}
                </select>
                <button className="btn btn-primary my-3" type="submit">
                    Submit
                </button>
            </form> */}
            <Maps />
        </>
    );
};
