import React from "react";
import PropTypes from "prop-types";
import { FOOTER_TEXT } from "../constants/Utilities";

const MyFooter = (props) => {
  return <div className="footer">{props.children}</div>;
};

MyFooter.propTypes = {
  children: PropTypes.node,
};

MyFooter.defaultProps = {
  children: FOOTER_TEXT,
};

export default MyFooter;
