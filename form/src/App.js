import React from "react";
import styled from "styled-components";
import { Form } from "./Components/Form";


const Container = styled.div`
    height: 100vh;
    width: 100%;
    margin-top: 0;
    background-image: linear-gradient( 109.6deg,  rgba(45,116,213,1) 11.2%, rgba(121,137,212,1) 91.2% );
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const App = () => {
    return (
        <Container>
            <Form />
        </Container>
    );
};
