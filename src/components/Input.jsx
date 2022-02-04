import { useState } from "react"
export const Input = ({type, name}) => {
    const [text,setText]= useState('')
    let input
    if (type!='submit'){
        input=<input type={type} name={name} value={text} onChange={(e)=>setText(e.target.value)}/>
    }
    else{
        input=<input type={type} value={name} style={{background:'blue'}}/>
    }
    return (
<>
        {input}
        </>
        // </>
        
            
        // <input type={type} {}/>
    )
}
