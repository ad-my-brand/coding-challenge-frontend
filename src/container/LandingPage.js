import React, { useEffect, useState } from "react";
import axios from "axios";

import classes from './LandingPage.module.css'
import UserList from "../components/UserList/UserList";
import InfoPanel from '../components/InfoPanel/InfoPanel'

function LandingPage() {

    const [userData, setUserData] = useState(null);
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(() => {

        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                setUserData(response.data)
            })

    }, [])


    const showDetailHandler = (id) => {
        setSelectedUser(userData[id-1]);
    }

    return(
        <div className={classes.MainContainer}>
            <nav>FrontEnd Assignment</nav>

            <div className={classes.Container}>
                <UserList 
                    userData = {userData}
                    showDetailHandler = {(id) => showDetailHandler(id)}/>
                
                <InfoPanel 
                    user = {selectedUser}/>
            </div>

        </div>
    )
}

export default LandingPage