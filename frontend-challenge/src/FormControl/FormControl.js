import React, { useEffect, useState } from 'react';
import Form from '../Form/Form';

const FormControl = () => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=>res.json())
        .then(data=>setData(data))
    },[])
    return (
    
            <div className="grid gap-4 lg:grid-cols-3">
                {
                    data.map(d=><Form
                    d={d}
                    ></Form>)
                }
            </div>
    
    );
};

export default FormControl;