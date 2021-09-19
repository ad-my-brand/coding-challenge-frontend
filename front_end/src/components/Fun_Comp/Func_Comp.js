import axios from 'axios';
import React, {useEffect, useState} from 'react';


function Func_Comp(){
    const [datas, setDatas] = useState([]);

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
            
           
            console.log("the data get is ", res.data);
             setDatas(res.data);
        })
    },[1])
    return(
        <div>
            <h1>hello from react functional component</h1>
            <h1>
            {datas.map((da)=>{
                return(
                    <div><h2>{da.name}</h2> </div>
                )
            })}
            </h1>
        </div>
    )
}

export default Func_Comp;