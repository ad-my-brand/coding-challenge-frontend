import classes from './FormControl.module.css';

const FormControl = (props) => {
  const formControlClasses =
    props.type === 'radio' ? classes.FormControlRadio : classes.FormControlText;
    
  return (
    <div className={`${formControlClasses}`}>
      <label data-testid='label' htmlFor={props.type === 'radio' ? props.id : props.name}>
        {props.label}
      </label>
      <input
        data-testid='input'
        name={props.name}
        type={!props.type ? 'text' : props.type}
        id={props.type === 'radio' ? props.id : props.name}
        placeholder={`Enter ${props.name}`}
        onChange={props.onChange}
        value={props.value}
      />
      {props.error && <p data-testid='error-text' className="error-text">{props.error}</p>}
    </div>
  );
};

export default FormControl;
