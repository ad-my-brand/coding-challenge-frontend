import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  const history = useHistory();
  console.log(history.push("/map"));
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <div className="container">
          <Link to="/">
            <p className="navbar-brand " href="#">
              Home
            </p>
          </Link>
          <Link to="/map">
            <p className="navbar-brand" href="#">
              Map
            </p>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
