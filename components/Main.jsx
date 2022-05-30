import dynamic from 'next/dynamic';
import Form from './Form';
import { useContext } from 'react';
import { ErrorProvider } from '../context/errors';
import { InputProvider } from '../context/input';
import UserContext from '../context/user';

import classes from '../styles/Main.module.scss';

const Map = dynamic(() => import('./Map'), { ssr: false });

const Main = ({ users }) => {
  const {
    selectUser: { user },
  } = useContext(UserContext);

  return (
    <div className={classes.main}>
      <InputProvider>
        <ErrorProvider>
          <Form users={users} className={classes['main--left']} />
        </ErrorProvider>
      </InputProvider>
      {user && <Map />}
    </div>
  );
};

export default Main;
