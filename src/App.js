import React, { useEffect } from "react";
import styled from "styled-components";
import UserList from "./components/UserList";
import { useDispatch } from "react-redux";
import { setUsers } from "./redux/action";
import axios from "axios";
import PostUser from "./components/PostUser";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    axios
      .get(apiUrl)
      .then((response) => dispatch(setUsers(response.data)))
      .catch((error) => {
        throw error;
      });
  }, []);
  return (
    <>
      <Header>Coding Challenge</Header>
      <Wrapper>
        <UserList />
        <PostUser />
      </Wrapper>
    </>
  );
}

export default App;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1em;
  position: fixed;
  top: 0;
  width: 100%;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
  background: linear-gradient(180deg, #4b91f7 0%, #367af6 100%);
  color: #fff;
  font-size: 1.5em;
  height: 50px;
  z-index: 5000;
`;
const Wrapper = styled.div`
  padding: 1em;
  margin-top: 50px;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1em 0;
  }
`;
