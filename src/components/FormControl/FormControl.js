import classes from './FormControl.module.css';

const FormControl = (props) => {
  return (
    <div className={classes.FormControl}>
      <label htmlFor={props.type === 'radio' ? props.id : props.name}>{props.label}</label>
      <input
        name={props.name}
        type={!props.type ? 'text' : props.type}
        id={props.type === 'radio' ? props.id : props.name}
        placeholder={`Enter ${props.name}`}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
      {props.error && <p>{props.error}</p>}
    </div>
  );
};

export default FormControl;
