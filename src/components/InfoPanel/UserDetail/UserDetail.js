import React from "react";

import classes from './UserDetail.module.css'

const UserDetail = (props) => {
        return(
        <div className={classes.UserDetail}>
            <h2>{props.user.name}</h2>
            <h4>{props.user.email}</h4>
            <h5>{props.user.phone} </h5>
            <h6>{props.user.address !== undefined ? props.user.address.street + ", " +  props.user.address.city: null}</h6>
        </div>   
    )
}

export default UserDetail;