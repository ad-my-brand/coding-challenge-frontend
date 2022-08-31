function FormControl({ users, value, handleChange }) {
    return (
        <>
            <select name="userId" value={value} onChange={handleChange}>
                <option value="" defaultChecked>Please Select</option>
                {users.map((option) => {
                    return <option value={`${option.id}`} key={option.id}>{option.name}</option>
                })}
            </select>
        </>
    )
}
export default FormControl;