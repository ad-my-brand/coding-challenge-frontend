import React from "react";
import PropTypes from "prop-types";
import { Button, Spinner } from "react-bootstrap";

const MyButton = (props) => {
  return (
    <>
      {props.loading ? (
        <Button id="button" className={`${props.className} disabled`}>
          <Spinner animation="border" size="sm" />
          <span className="ms-2">{props.children}</span>
        </Button>
      ) : (
        <Button id="button" type={props.type} className={props.className}>
          {props.children}
        </Button>
      )}
    </>
  );
};

MyButton.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
};

MyButton.defaultProps = {
  children: "Create",
  loading: false,
  type: "submit",
  className: "mt-3 float-end",
};

export default MyButton;
