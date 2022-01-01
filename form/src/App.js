import React from "react";
import styled from "styled-components";
import { Form } from "./Components/Form";


const Container = styled.div`
    background-color: blue;
    height: 120vh;
    width: 100%;
    margin-top: 0;

`;

export const App = () => {
    return (
        <Container>
            <Form />
        </Container>
    );
};
