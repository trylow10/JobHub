// Libraries
import React from "react";
import { Link } from "react-router-dom";

// Styled Components
import { Nav, NavLink, Login } from "./Styles/HeaderStyled";

const Header = ({ hidden }) => {
  return (
    <Nav>
      <Link to="/" className="logo-div">
        <img src="/images/login-logo.svg" alt="" />
      </Link>

      <NavLink>
        {!hidden && (
          <>
            <Link to="/" className="icon-div">
              <i className="fa-solid fa-compass"></i>
              <span>discover</span>
            </Link>

            <Link to="/" className="icon-div">
              <i className="fa-solid fa-user-group"></i>
              <span>people</span>
            </Link>

            <Link to="/" className="icon-div">
              <i className="fa-solid fa-chalkboard-user"></i>
              <span>learning</span>
            </Link>

            <Link to="/" className="icon-div">
              <i className="fa-solid fa-briefcase"></i>
              <span>jobs</span>
            </Link>

            <div className="divider" />
          </>
        )}

        <Login to="/join-now">Join Now</Login>
      </NavLink>
    </Nav>
  );
};

export default Header;
