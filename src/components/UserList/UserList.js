import React from "react";
import classes from './UserList.module.css'

import UserListItem from './UserListItem/UserListItem'

const UserList = (props) => {

    let list = props.userData !== null ? props.userData.map(item => {
        return <UserListItem 
                key = {item.id}
                user = {item}
                showDetailHandler = {(id) => props.showDetailHandler(id)}/>
    }) : null;

    return(
        <div className={classes.ListContainer}>
            <h1>User List</h1>
            <ul className={classes.List}>
                {list}
            </ul>
        </div>
    )
}

export default UserList;
