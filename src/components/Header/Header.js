import React from 'react';
import "./Header.css";
import logo from "../../assets/images/logo.svg";
import { NavLink } from 'react-router-dom';
const Header = (props) => {
    return (
    <header className="Header">
        <div className="column">
            <img src={logo} className="logo" alt="logo"/>
            <div className="column">Dashboard</div>
        </div>
        <nav>
        {props.isAuth ? <NavLink to="/logout" exact>Logout</NavLink> 
        : <span>Hello a stranger</span>
        }
        </nav>
    </header>
    )
}

export default Header