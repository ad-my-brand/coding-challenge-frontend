import React from "react";
import classes from './UserListItem.module.css'

const UserListItem = (props) => {
    return(
        <div className={classes.ItemContainer}>
            <li 
                className={classes.ListItem}
                onClick={() => props.showDetailHandler(props.user.id)}>
                {props.user.name}
            </li>
        </div>
       
    )
}

export default UserListItem;
