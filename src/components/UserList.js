import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import FormControl from "./FormControl";
import MapComponent from "./MapComponent";

const UserList = () => {
  const [listData, setListData] = useState([]);
  const [userGeo, setUserGeo] = useState({});
  const [userId, setuserId] = useState(null);
  let { allUsers } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    setListData(allUsers);
  }, [allUsers]);

  const userListFormConfig = {
    disabled: true,
    validationText: "Please select a user",
  };
  const handleClick = (e) => {
    switch (e.target.id) {
      case "select":
        setuserId(e.target.dataset.content);
        let currentUser = listData.find(
          (data) => e.target.dataset.content == data.id
        );
        setUserGeo(currentUser.address.geo);

        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <SubBox>
        <MapComponent {...userGeo} />
        <div>
          <FormControl userId={userId} {...userListFormConfig} />
          {listData &&
            listData.map((data) => (
              <BodyDiv key={data.id}>
                <NameDiv>{data.name}</NameDiv>
                <div>
                  <Button
                    id="select"
                    data-content={data.id}
                    onClick={handleClick}
                  >
                    Select
                  </Button>
                </div>
              </BodyDiv>
            ))}
        </div>
      </SubBox>
    </Box>
  );
};

export default UserList;

const Box = styled.div``;
const SubBox = styled.div``;
const BodyDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
  margin-top: 0.5em;
`;
const NameDiv = styled.div`
  font-weight: 500;
  font-size: 1.15em;
`;
const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
  border-radius: 6px;
  font-size: 0.85em;
  border: none;
  color: #fff;
  background: linear-gradient(180deg, #4b91f7 0%, #367af6 100%);
  background-origin: border-box;
  box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25),
    inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &:focus {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2),
      0px 0.5px 1.5px rgba(54, 122, 246, 0.25),
      0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
    outline: 0;
  }
`;
