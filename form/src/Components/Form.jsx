import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { MapContainer } from "./MapContainer";

const Container = styled.div`
    /* margin: auto; */
    width: 28%;
    height: 95vh;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h1`
    margin: 10px 0;
    text-align: center;
`;
const SubmitForm = styled.form`
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    /* align-items: cen; */
    justify-content: center;
`;
const Message = styled.h3`
    text-align: center;
`;
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* margin: 15px 0; */
    justify-content: flex-start;
    margin: 5px 0;
`;
const Label = styled.label`
    /* flex:1; */
    padding: 5px 0;
    margin-left: 7px 0;
`;
const Select = styled.select`
    /* flex: 1; */
    height: 40px;
    padding: 5px 10px;
    width: 270px;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.7);
    border-radius: 10px;
`;
const Option = styled.option`
    height: 90px;
    width: 270px;
    padding: 5px 10px;
    width: 100%;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.7);
    /* border-radius: 10px; */
`;
const Input = styled.input`
    /* flex:1; */
    width: 252px;
    /* width: 100%; */
    height: 30px;
    padding: 5px 10px;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.7);
    border-radius: 10px;
`;
const TextArea = styled.textarea`
    /* flex: 1; */
    height: 14vh;
    width: 252px;
    padding: 5px 10px;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    /* width: 280px; */
`;

const Button = styled.button`
    width: 100%;
    margin: 10px auto;
    padding: 10px 10px;
    border-radius: 10px;
    outline: none;
    border: 1px solid transparent;
    background-color: #3bb78f;
    background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
`;
const IconContainer = styled.div``;
export const Form = () => {
    const [users, setUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState({});
    const [saveData, setSaveData] = useState({
        title: "",
        body: "",
        userId: undefined,
    });
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const userData = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(userData.data);
    };
    const saveUser = (e) => {
        const currentUser = users.find((user) => user.id == e.target.value);
        setSaveData({ ["userId"]: currentUser.id });
        setSelectedUser(currentUser);
    };
    const sendData = (e) => {
        // console.log(selectedUser);
        if (selectedUser) {
            e.preventDefault();
            alert("User not selected");
            return;
        }
        if (saveData.title === "" || saveData.body === "") {
            e.preventDefault();
            alert("Title or message connot be left empty");
            return;
        }
        axios
            .post("https://jsonplaceholder.typicode.com/posts", {
                saveData,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log(saveData);
    };
    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setSaveData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Container>
            <Title>Message Saver</Title>
            <SubmitForm onSubmit={sendData} preventDefault>
                {/* <Message>Save a message</Message> */}
                <InputContainer>
                    <Label>Select a User</Label>
                    <Select onChange={(e) => saveUser(e)}>
                        <Option>Username</Option>
                        {users &&
                            users.map((user) => (
                                <Option key={user.id} value={user.id}>
                                    {user.name}
                                </Option>
                            ))}
                    </Select>
                </InputContainer>

                <MapContainer
                    address={selectedUser ? selectedUser.address : {}}
                />

                <InputContainer>
                    <Label>Enter Title</Label>
                    <Input
                        type='text'
                        placeholder='Title'
                        name='title'
                        onChange={inputsHandler}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Enter Message</Label>
                    <TextArea
                        type='text'
                        placeholder='Message'
                        name='body'
                        onChange={inputsHandler}
                    />
                </InputContainer>
                <Button type='submit'>Submit</Button>
            </SubmitForm>
        </Container>
    );
};
