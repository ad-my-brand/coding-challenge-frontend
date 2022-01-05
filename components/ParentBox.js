import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import FormControl from './parent-components/FormControl'

export default function ParentBox() {
    const[isVisible, setIsVisible] = useState(false)
    axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
        console.log(res)
        for(let i = 0; i < res.data.length; i++){
            userData.push({
                id: res.data[i].id,
                name: res.data[i].name,
                lat: res.data[i].address.geo.lat,
                lng: res.data[i].address.geo.lng,
            })
        }
        console.log()
        setIsVisible(true)
    })
    return (
        <div className='flex justify-center z-10 relative'>
            {isVisible ?
            <FormControl label={'Form Prototype'} userData={userData}/>
            :
            <div className='flex justify-center items-center'>Fetching Data...</div>
            }
        </div>
    )
}
export let userData = []