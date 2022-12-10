import React from 'react';
import { DataContext } from '../../pages';

const FormControl = ({ label, validationFn, errorMsg }) => {
  const users = React.useContext(DataContext);
  const onChangeHandler = (val) => {
    validationFn(val);
  };

  return (
    <div className='w-full form-control flex flex-col gap-3'>
      <label htmlFor={label}>{label}</label>
      <select
        className='focus:outline-none w-full border p-2'
        onChange={(e) => onChangeHandler(e.target.value)}
      >
        <option value='select user'>Select User</option>
        {users &&
          users.map((user) => {
            return (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
      </select>
      {errorMsg && <p className='text-red-500 font-sans'>{errorMsg}</p>}
    </div>
  );
};

export default FormControl;
