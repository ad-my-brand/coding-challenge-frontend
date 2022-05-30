import classes from '../../styles/SelectOption.module.scss';

const SelectOption = ({ id, name }) => {
  return (
    <>
      <input
        type="radio"
        name="user"
        id={id}
        value={name}
        className={classes['select-option__input']}
      />
      <label className={classes['select-option__label']} htmlFor={id}>
        {name}
      </label>
    </>
  );
};

export default SelectOption;
