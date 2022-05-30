import UserContext from '../context/user';
import { useContext } from 'react';

import classes from '../styles/Header.module.scss';

const Header = () => {
  const {
    selectUser: { user },
  } = useContext(UserContext);

  const text = user?.name ? `Hey,  ${user.name}` : 'Please select a user';

  return (
    <div className={classes.header}>
      <h1>{text}</h1>
    </div>
  );
};

export default Header;
