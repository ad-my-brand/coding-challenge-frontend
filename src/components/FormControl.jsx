import Select from '../components/Select'
import {Input} from '../components/Input'
export const FormControl = ({label, kind='input', type='text', error, users}) => {
    // console.log(kind)
    
    return (
        <div>
            <label htmlFor={label}>{type!='submit' && label}</label>
            {error && <p>Please fill a {label}</p>}
            {kind==="select"? <Select users={users}/>:<Input type={type} name={label}/>}
        </div>
    )
}
