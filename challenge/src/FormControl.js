
function OptionElement(props){
    return (
        <option value={`${props.id}`}>{props.name}</option>
    )
}

export default function FormControl(props) {

    const optionElemets= props.users.map(user=>([
        <OptionElement key={user.id} id={user.id} name={user.name} />
    ]))

    return (
        <select name="userId" id="users" value={props.value} onChange={props.onChange}>
            <option value="" defaultChecked>------------choose----------</option>
            {optionElemets}
        </select>
    )
}