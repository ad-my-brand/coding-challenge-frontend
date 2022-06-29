import React from "react";
import styled from "styled-components";

const FormControl = (props) => {
  const { label, validationText, userId, disabled } = props;
  return (
    <>
      <FormBox>
        <FormDiv>
          {label ? <label>{label}</label> : ""}
          <Input
            type="text"
            value={userId || ""}
            disabled={disabled ? true : false}
          />

          {userId ? <Spacer /> : <Text>{validationText}</Text>}
        </FormDiv>
      </FormBox>
    </>
  );
};

export default FormControl;
const FormBox = styled.form``;
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.p`
  margin: 0.25em 0;
  color: red;
  font-size: 0.9em;
`;
const Input = styled.input`
  font-size: 16px;
  font-size: max(16px, 1em);
  font-family: inherit;
  padding: 0.25em 0.5em;
  background-color: #fff;
  border: 2px solid #8b8a8b;
  border-radius: 4px;
`;

const Spacer = styled.div`
  min-height: 1.4em;
`;
