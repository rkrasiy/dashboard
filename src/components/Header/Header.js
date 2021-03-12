import React from 'react';
import "./Header.css";
import logo from "../../assets/images/logo.svg";

const Header = (props) => {
    return (
    <header className="Header">
        <div className="column">
            <img src={logo} className="logo" alt="logo"/>
            <div className="column">Dashboard</div>
        </div>
        <nav>
            NAV
        </nav>
    </header>
    )
}

export default Header