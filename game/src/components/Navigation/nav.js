import React from "react";
import "./nav.css";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  return (
    <nav className="navbar-main">
      <Link to="/" className="nav-brand">
        SIX DEGREES
      </Link>
      <div className="nav-menu">
        <Link to="/register">Register Here</Link>
      </div>
    </nav>
  );
}

export default Nav;
