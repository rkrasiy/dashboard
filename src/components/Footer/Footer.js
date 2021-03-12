import React from 'react';
import "./Footer.css";

const Footer = (props) => {
    let titleLink = "";
    if(props.linktitle){
        titleLink = props.linktitle
    }else{
        titleLink = props.link
    }
    return(
    <footer className="Footer">
        <div className="row">
            <a href={props.link} 
                target="_blank" 
                title={titleLink}
                rel="noreferrer">
                {props.children}
            </a>
        </div>
    </footer>
    )
}

export default Footer