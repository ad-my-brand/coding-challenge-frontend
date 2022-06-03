import classes from '../../styles/Notification.module.scss';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState } from 'react';
import { NOTIFICATION_TIMEOUT } from '../../config';

const Content = ({ msg, fail }) => {
  return (
    <div
      className={`${classes.notification} ${
        fail ? classes.fail : classes.success
      }`}
    >
      {fail ? (
        <ErrorOutlineIcon fontSize="large" />
      ) : (
        <CheckCircleOutlineIcon fontSize="large" />
      )}
      {msg}
    </div>
  );
};

const Notification = ({ msg, fail }) => {
  const [visible, setVisible] = useState(true);

  setTimeout(() => {
    setVisible(false);
  }, NOTIFICATION_TIMEOUT * 1000);

  return visible && <Content msg={msg} fail={fail} />;
};

export default Notification;
