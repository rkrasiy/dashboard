import React from 'react';
import "./Button.css";
const button = (props) => {
    let classes = ["Button"]
    if(props.classes)
        classes.push(props.classes)
    return(
            <button className={classes.join(" ")}
            onClick={props.clicked}
            disabled={props.disabled}>{props.children}</button>
    )
}

export default button