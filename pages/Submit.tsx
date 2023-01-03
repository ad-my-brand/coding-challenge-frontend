import React from 'react'
import axios from 'axios'
import  Style  from '../styles/Home.module.css'
function Submit(props:{
        data :{
            title:string,
            body:string,
            userId:string
        }
    }){

    const handleSubmit=(event :React.FormEvent)=>{
        event.preventDefault()
        const fetchData=async ()=>{
            const responce=await axios.post('https://jsonplaceholder.typicode.com/users',{
                title:props.data.title,
                body:props.data.body,
                userId:parseInt(props.data.userId)
            })
            if(!responce.data){
                alert("HTTP requests fails")
            }else{
                alert("Data send")
            }
        }
        fetchData();
    }  

    return (
        <>
        <button 
            className={Style.but}
            type='submit' 
            onClick={handleSubmit} 
        >Submit</button>
        </>
    )
}

export default Submit