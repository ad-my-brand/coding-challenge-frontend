import React from 'react'

import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react"
import Dashboard from "../components/Dashboard"
describe('Dashboard', () => {
    let expextedprops;
    beforeEach(()=>{
        expextedprops = [{
            address:{
                city: "McKenziehaven",
                geo: {lat: '-68.6102', lng: '-47.0653'},
                street: "Douglas Extension",
                suite: "Suite 847",
                zipcode: "59590-4157",
            },
            company:{
                name: "Romaguera-Jacobson"
            },
            email: "Nathan@yesenia.net",
            id: 3,
            name: "Clementine Bauch",
            phone: "1-463-123-4447",
            username: "Samantha",
            website: "ramiro.info",

        }]
    })
    test("check the Details", () => {
       render(<Dashboard element = {expextedprops}/>)
    })
})