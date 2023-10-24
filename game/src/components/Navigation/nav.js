import React from 'react';
import "./nav.css";
import { useNavigate } from 'react-router-dom';

function Nav() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/Login');
  }

  return (
    <nav className="navbar">
      <a href="/" className="nav-brand">MathGrab</a>
      <ul className="nav-menu">
        <li><a href="/register">Register Here</a></li>
      </ul>
    </nav>
  );
}

export default Nav;