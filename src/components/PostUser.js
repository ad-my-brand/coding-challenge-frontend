import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const PostUser = () => {
  const validationInitailValue = {
    form: false,
    title: false,
    body: false,
  };
  const [postData, setPostData] = useState({
    title: "",
    body: "",
  });
  const [formValidation, setFormValidation] = useState(validationInitailValue);
  const [formError, setFormError] = useState(true);
  const handleChange = (e) => {
    setFormValidation(validationInitailValue);
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostData({ ...postData, ["userId"]: Math.ceil(Math.random()) });
    if (postData.title == "" && postData.body == "") {
      setFormValidation({ ...formValidation, ["form"]: true });
    } else if (postData.title == "") {
      setFormValidation({ ...formValidation, ["title"]: true });
    } else if (postData.body == "") {
      setFormValidation({ ...formValidation, ["body"]: true });
    } else {
      axios
        .post("https://jsonplaceholer.typicode.com/posts", postData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          setFormError(true);
          throw error;
        });
    }
  };
  return (
    <MainDiv>
      <SubDiv>
        {!formError ? <ErrorText>Form not submitted</ErrorText> : null}

        <Flex>
          <Text>Post User</Text>
          {formValidation.form ? (
            <ErrorText>Form Should not be empty</ErrorText>
          ) : null}
        </Flex>

        <FormBox onSubmit={handleSubmit}>
          <>
            <Flex>
              <Label>Title</Label>
              {formValidation.title ? (
                <ErrorText>Title Should not be empty</ErrorText>
              ) : null}
            </Flex>

            <Input
              type="text"
              onChange={handleChange}
              name="title"
              placeholder="Enter Title"
            />
          </>
          <>
            <Flex>
              <Label>Body</Label>
              {formValidation.body ? (
                <ErrorText>Body Should not be empty</ErrorText>
              ) : null}
            </Flex>

            <Input
              type="text"
              onChange={handleChange}
              name="body"
              placeholder="Enter Body"
            />
          </>
          <Button onClick={handleSubmit}>Submit</Button>
        </FormBox>
      </SubDiv>
    </MainDiv>
  );
};

export default PostUser;
const MainDiv = styled.div`
  margin-top: 1em;
`;
const SubDiv = styled.div``;
const Text = styled.p`
  font-size: 1.35em;
  margin: 0;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
`;

const Label = styled.label`
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
  margin-top: 0.5em;
`;
const FormBox = styled.form`
  display: flex;
  flex-direction: column;
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
const Button = styled.button`
  display: flex;
  margin-top: 0.75em;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px 8px;

  font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
  border-radius: 6px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  background-origin: border-box;
  background: linear-gradient(180deg, #4b91f7 0%, #367af6 100%);
  box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25),
    inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  .&:focus {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2),
      0px 0.5px 1.5px rgba(54, 122, 246, 0.25),
      0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
    outline: 0;
  }
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ErrorText = styled.p`
  margin: 0;
  color: red;
  font-size: 0.9em;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
`;

// <!-- HTML !-->
// <button class="button-31" role="button">Button 31</button>

// /* CSS */
// .button-31 {
//   border-radius: 4px;
//   border-style: none;
//   box-sizing: border-box;
//   color: #fff;
//   cursor: pointer;
//   display: inline-block;
//   font-family: "Farfetch Basis","Helvetica Neue",Arial,sans-serif;
//   font-size: 16px;
//   font-weight: 700;
//   line-height: 1.5;
//   margin: 0;
//   max-width: none;
//   min-height: 44px;
//   min-width: 10px;
//   outline: none;
//   overflow: hidden;
//   padding: 9px 20px 8px;
//   position: relative;
//   text-align: center;
//   text-transform: none;
//   user-select: none;
//   -webkit-user-select: none;
//   touch-action: manipulation;
//   width: 100%;
// }
