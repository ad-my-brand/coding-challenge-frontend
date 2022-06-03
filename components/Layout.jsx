import classes from '../styles/Layout.module.scss';

const Layout = ({ children }) => {
  return <div className={classes.layout}>{children}</div>;
};

export default Layout;
