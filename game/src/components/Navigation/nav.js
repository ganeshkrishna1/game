import React from 'react';
import "./nav.css";
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/Login');
    }

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">MathGrab</Link>
            <ul className="nav-menu">
                <li><Link to="/register">Register Here</Link></li>
                {/* Uncomment the line below if you want to use the handleLogout function */}
                {/* <li><button onClick={handleLogout}>Logout</button></li> */}
            </ul>
        </nav>
    );
}

export default Nav;
