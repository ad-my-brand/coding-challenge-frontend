import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MySnackbar = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.hideDuration}
      onClose={props.handleClose}
    >
      <Alert
        severity={props.severity}
        sx={{ width: "100%" }}
        onClose={props.handleClose}
      >
        {props.children}
      </Alert>
    </Snackbar>
  );
};

MySnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  severity: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  hideDuration: PropTypes.number,
};

MySnackbar.defaultProps = {
  hideDuration: 6000,
};

export default MySnackbar;
