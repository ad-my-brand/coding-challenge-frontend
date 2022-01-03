import React from "react";
import styled from "styled-components";
import Form from "./components/Form";

const Header = styled.div`
  background: #42C0FB;
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 32px;
  margin: 0px -16px;
`;

const App = () => {
  return (
    <>
      <Header>Form</Header>
      <Form />
    </>
  );
}

export default App;
