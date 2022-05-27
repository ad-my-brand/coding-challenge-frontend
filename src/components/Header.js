import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  return <div className="header">{props.title}</div>;
};

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: "Some Users",
};

export default Header;
