import styles from '../styles/Button.module.scss';

const Button = ({ children, onClick, className, type }) => {
  const classes = `${styles.btn}  ${styles[className]}`;

  if (type === 'submit') {
    return (
      <button className={classes} onClick={onClick} type="submit">
        {children}
      </button>
    );
  }
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
