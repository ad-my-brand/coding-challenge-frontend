import React, { useState, useEffect } from "react";
import axios from "axios";
import { Maps } from "./Maps";
import { PostForm } from "./PostForm";

export const LocationForm = () => {
    const [names, setNames] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [selects, setSelects] = useState();
    const [new_location, setNewLocation] = useState({});
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
        const latitude = Number(userToDisplay[0].address.geo.lat);
        const longitude = Number(userToDisplay[0].address.geo.lng);
        setNewLocation({
            address:
                userToDisplay[0].address.street +
                ", " +
                userToDisplay[0].address.city,
            lat: latitude,
            lng: longitude,
        });
        setToggle(!toggle);
    };
    useEffect(() => {
        getNames();
    }, []);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="py-3 my-5 d-flex justify-content-center border border-primary rounded">
                            <form onSubmit={renderMap}>
                                <label className="my-3 h3">Select a user</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={selects}
                                    onChange={e => setSelects(e.target.value)}
                                >
                                    <option selected>--Select--</option>
                                    {names.map(name => {
                                        return (
                                            <option value={name.id}>
                                                {name.name}
                                            </option>
                                        );
                                    })}
                                </select>
                                <button
                                    className="btn btn-primary my-3"
                                    type="submit"
                                >
                                    Locate User
                                </button>
                            </form>
                        </div>
                        <PostForm />
                    </div>
                    <div className="col">
                        {toggle && <Maps new_location={new_location} />}
                    </div>
                </div>
            </div>
        </>
    );
};
