import { useEffect, useState } from 'react';
import styles from '../styles/FormControl.module.scss';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Select from './Select';

const FormControl = ({
  label = '',
  value,
  onChange,
  type = 'text',
  validate,
  errMsg = 'Please enter the valid input',
  error,
  setError,
  submit,
  users = null,
}) => {
  const [isTouched, setIsTouched] = useState(false);

  const classes = `${styles[`form-control`]} ${error ? styles.invalid : ''}`;

  const { isSubmitted, formIsValid } = submit;

  useEffect(() => {
    if (isSubmitted) {
      formIsValid ? setIsTouched(false) : setIsTouched(true);
    }
  }, [isSubmitted, formIsValid]);

  useEffect(() => {
    const isValid = validate(value);
    setError(!isValid && isTouched);
  }, [isTouched, value, validate, setError]);

  const changeHandler = e => {
    onChange(e.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  if (type === 'select') {
    return (
      <div className={classes} style={{ width: 'max-content' }}>
        <Select onClick={blurHandler} users={users} />
        {error && (
          <p className={styles['error-text']}>
            <ErrorOutlineIcon fontSize="large" sx={{ color: '#eb5757' }} />
            {errMsg}
          </p>
        )}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className={classes}>
        <label htmlFor={label} className={styles['form-control__label']}>
          {label}
        </label>
        <textarea
          id={label}
          className={styles['form-control__input']}
          value={value}
          rows="5"
          onChange={changeHandler}
          onBlur={blurHandler}
        ></textarea>
        {error && (
          <p className={styles['error-text']}>
            <ErrorOutlineIcon fontSize="large" sx={{ color: '#eb5757' }} />
            {errMsg}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={classes}>
      <label htmlFor={label} className={styles['form-control__label']}>
        {label}
      </label>
      <input
        id={label}
        className={styles['form-control__input']}
        type={type}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
      {error && (
        <p className={styles['error-text']}>
          <ErrorOutlineIcon fontSize="large" sx={{ color: '#eb5757' }} />
          {errMsg}
        </p>
      )}
    </div>
  );
};

export default FormControl;
