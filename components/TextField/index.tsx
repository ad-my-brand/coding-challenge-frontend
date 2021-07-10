import { ChangeEvent } from "react"

interface TextFieldProps {
  name: string,
  error?: string,
  label: string,
  value: string,
  required?: boolean,
  handleChange: (name: string, val: string) => void,
  validate: (val: string, name: string, err: string) => boolean
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  error,
  label, 
  value, 
  handleChange,
  required,
  ...props
}) => {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(props.validate(e.currentTarget.value, name, `Please enter ${name}`)) {
      handleChange(name, e.currentTarget.value);
    }

  }

  return (
    <div>
      <label>{label}</label>
      <input 
        type="text" 
        name={name}
        value={value} 
        onChange={handleInputChange}
      />
      <small>{error}</small>
    </div>
  )
}