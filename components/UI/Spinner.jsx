import classes from '../../styles/Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={classes.center}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default Spinner;
