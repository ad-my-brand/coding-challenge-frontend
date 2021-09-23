import React, { useState } from 'react';

const UserContext = React.createContext({
    userId: null,
    username: "",
    isUserValid: false
});

export const UserContextProvider = (props) =>{
    const [username,setUsername] = useState("");
    const [userid,setUserid] = useState("");
       
    const onResetHandler = () =>{
        setUserid("");
        setUsername("");
    }
    const onMarkerClick = (name,id) =>{
        setUserid(id);
        setUsername(name);
    }
    return <UserContext.Provider value={{
        username: username,
        userId: userid,
        changeUserdetails: onMarkerClick,
        resetUserDetails: onResetHandler
        }}>
      {props.children}
    </UserContext.Provider>
}
export default UserContext;