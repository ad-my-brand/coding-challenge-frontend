import classes from '../../styles/Select.module.scss';
import SelectOption from './SelectOption';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '../Button';
import { useContext } from 'react';
import UserContext from '../../context/user';

const Select = ({ onClick, users }) => {
  const {
    toggle,
    hide,
    changeUser,
    selectUser: { user, show: showUsers },
  } = useContext(UserContext);

  const selectClickHandler = () => {
    toggle();
  };

  const userChangeHandler = e => {
    const target = e.target;
    const user = users.find(user => user.id === +target.id);

    changeUser(user);
    hide();
  };

  return (
    <div className={classes.select} onClick={onClick}>
      <Button className="round" onClick={selectClickHandler}>
        <AccountCircleIcon sx={{ color: '#3b82f6' }} fontSize="large" />
        {user ? user.name : 'Select a user'}
        {showUsers ? (
          <ExpandLessIcon fontSize="large" />
        ) : (
          <ExpandMoreIcon fontSize="large" />
        )}
      </Button>
      {showUsers && (
        <div className={classes.select__options} onChange={userChangeHandler}>
          {users.map(item => (
            <SelectOption key={item.id} id={item.id} name={item.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
