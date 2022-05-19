import classes from "./Input.module.css";
import Proptypes from "prop-types";

const Input = (props) => {

  return (
    <>
      <div className={classes.Input__control}>
        <div className={classes.Label__error}>
          <label className={classes.Label} htmlFor={props.htmlFor}>
            {props.label}
            {props.required && <sup className={classes.Input__reqError}>*</sup>}
          </label>
          {props.validation && <p className={classes.Input__reqError}>! Please enter a valid {props.label}</p>}
        </div>
        <input
          type={props.type}
          id={props.htmlFor}
          className={classes.Input}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          required={props.required}
        />
      </div>
    </>
  );
};

Input.Proptypes = {
  type: Proptypes.string.isRequired,
  htmlFor:Proptypes.string.isRequired,
  onChange:Proptypes.func.isRequired,
  name:Proptypes.string.isRequired,
  required:Proptypes.bool.isRequired,
}

export default Input;
