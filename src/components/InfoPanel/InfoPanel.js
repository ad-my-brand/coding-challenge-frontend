import React from "react";

import classes from './InfoPanel.module.css'
import UserDetail from "./UserDetail/UserDetail";
import FormLayout from "./Form/FormLayout/FormLayout";
import MapAPI from '../InfoPanel/GoogleAPI/BingMap'
import BG from '../../assests/bg.png'

function InfoPanel(props){

    let show = props.user.address !== undefined;

    return(
        <div className={classes.InfoPanel}>
            <div className={classes.bg} style = {{display : show ? "none" : ""}}>
                <img src = {BG} alt="background"/>
                <p>Please select a user.</p>
            </div>

            <UserDetail 
                user = {props.user}/>

            <div className={classes.GoogleForm}>
                <FormLayout user = {props.user}/>
                <MapAPI user = {props.user}/>
            </div>
            
        </div>
    )
}

export default InfoPanel;