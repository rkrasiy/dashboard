import React from 'react';
import "./Header.css";
import logo from "../../assets/images/logo.svg";

import { NavLink } from 'react-router-dom';
const Header = (props) => {
    let userName = null;
    let navLink = null;
    if(props.userName)
        userName = <p className="user-name">{props.userName}</p>
    if(props.isAuth){
        navLink = <NavLink to="/logout" exact>Logout</NavLink> 
    }
    
    
    return (
    <header className="Header">
        <div className="column">
            <img src={logo} className="logo" alt="logo"/>
            <div className="column">Dashboard</div>
        </div>
        <nav>
        {userName}
        <span className="circle inverted"><i className="user big icon"></i></span>
        
        {navLink}
        </nav>
    </header>
    )
}

export default Header