import { ChangeEvent } from "react";

interface FormControlProps {
  error?: string
  name: string,
  label: string
  data: {id: number, name: string}[],
  id: number,
  handleChange: (name: string, val: number) => void,
  validate: (val: string, err: string) => boolean
}

export const FormControl: React.FC<FormControlProps> = ({
  name,
  data,
  error, 
  label,
  id, 
  handleChange,
  ...props
}) => {

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if(props.validate(e.currentTarget.value, 'Please select a user')) {
      handleChange(name, Number(e.currentTarget.value));
    }

  };

  return (
    <div>
      <label htmlFor="">{label}</label>
      <select name={name} value={id} onChange={handleSelectChange}>
        <option value="0">Username</option>
        {data.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
      </select>
      <small>{error || ' '}</small>
    </div>
  )
}