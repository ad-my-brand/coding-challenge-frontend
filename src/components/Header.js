import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui secondary menu">
      <Link to="/" className="item">
        <h3>Form Control</h3>
      </Link>
    </div>
  );
};

export default Header;
