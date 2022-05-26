import UserCard from "../components/UserCard";
import FormControl from "../components/FormContol";
import axios from "axios";
import CardSlider from "../components/CardSlider";
import Map from "../components/Map";
//import styles from '../styles/Home.module.css'
import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
export default function Home() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const handleClick = () => {
    const hiddenBlock = document.getElementById("toggle");
    const wrapper = document.getElementById("containe");
    wrapper.setAttribute(
      "class",
      "transition-all duration-300 justify-evenly flex h-screen items-center bg-indigo-500 flex-wrap fixed w-screen p-4 overflow-scroll"
    );
    hiddenBlock.setAttribute(
      "class",
      "transition-all duration-500 w-max opacity-100 m-2"
    );
  };
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      let arr = [];
      res.data.forEach((ele) => {
        arr.push(
          <UserCard
            name={ele.name}
            username={ele.username}
            company={ele.company.name}
            email={ele.email}
            phone={ele.phone}
            website={ele.website}
            imgURL="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            onClick={handleClick}
            id={ele.id}
            coords={ele.address.geo}
          />
        );
      });
      setUserList(arr);
      arr = [];
    });
  }, []);
  return (
    <Wrapper id="containe">
      <UserManage>
        <SearchArea>
          <Search
            style={{ fontFamily: '"Spline Sans Mono", monospace' }}
            cols="34"
            rows="1"
            readOnly
            value={`Click on your card to create a Post`}
          />
        </SearchArea>
        <CardSlider
          userList={userList}
          knowUser={selectedUser}
          setUser={setSelectedUser}
        />
      </UserManage>
      <PostArea id="toggle">
        {userList && (
          <FormControl id={selectedUser + 1} data={userList[selectedUser]} />
        )}
      </PostArea>
      <MapContainer>
        <Map userList={userList} knowUser={selectedUser} />
      </MapContainer>
    </Wrapper>
  );
}
const Wrapper = tw.div`
flex
fixed
flex-wrap
h-screen
w-screen
items-center
justify-center
bg-indigo-500
p-4
overflow-scroll
`;
const UserManage = tw.div`
z-10
translate
ease-out
duration-300
`;
const PostArea = tw.div`
w-0
h-0
opacity-0
`;
const SearchArea = tw.div`
mb-2
flex
justify-center
`;
const Search = tw.textarea`
rounded
resize-none
overflow-hidden
outline-none
border-0
font-mono
font-serif
bg-indigo-500
text-blue-300
p-2
`;
const MapContainer = tw.div`
flex
m-2
h-96
w-96

`;
