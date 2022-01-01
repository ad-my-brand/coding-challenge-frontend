import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
   
`;
const SubmitForm = styled.form``;
const Title = styled.h1``;
const Message = styled.h3``;
const Input = styled.input``;
const Select = styled.select``;
const Option = styled.option``;
const Button = styled.button``;
const InputContainer = styled.div``;
const Label = styled.label``;

const IconContainer = styled.div``;
export const Form = () => {
    const [users, setUsers] = useState("");
    return (
        <Container>
            <Title>Message Saver</Title>
            <SubmitForm>
                <Message>Save a message</Message>
                <Select>
                    <Option>Select the username</Option>
                </Select>
                <InputContainer>
                    <Label>Enter Title</Label>
                    <Input type='text' placeholder='Title' />
                </InputContainer>
                <InputContainer>
                    <Label>Enter Message</Label>
                    <Input type='text' placeholder='Message' />
                </InputContainer>
                <Button type='submit'></Button>
            </SubmitForm>
        </Container>
    );
};
