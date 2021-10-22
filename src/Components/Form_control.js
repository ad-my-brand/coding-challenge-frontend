import React, { useState, useEffect } from "react";
import { base, basePost } from "./api";

import Form from "./Form";
import axios from "axios";
import styled from "styled-components";
import Map from "./map";
const FormControl = () => {
    const [users, setUser] = useState([]);
    const [detail, setDetail] = useState([]);
    const [newUser, setNewUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        console.log(newUser);
    }, [newUser]);

    //using axios and fetch both.

    const getUsers = async () => {
        axios
            .get(base)
            .then(function (res) {
                setUser(res.data);
                setDetail(res.data);
                console.log(res.data);
            })
            .catch(function (err) {
                // handle error
                console.error(err);
                window.alert("could not fetch the data.");
            })
            .then(function () {
                // always executed
                console.log("data successfully fetched");
            });
    };

    const onAdd = async (body, title, id) => {
        await fetch(basePost, {
            method: "POST",
            body: JSON.stringify({
                body: body,
                title: title,
                userId: id,
            }),

            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => {
                if (res.status !== 201) {
                    return;
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                setNewUser((newUser) => [...newUser, data]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Wrapper>
                <Form users={users} onAdd={onAdd} newUser={newUser} />
                <Map detail={detail} />
            </Wrapper>
        </>
    );
};

export default FormControl;
const Wrapper = styled.div`
    min-height: 90vh;
    display: flex;
    justify-content: center;

    padding: 4rem;
`;
