import React from "react";
const MenuElement = (props) => {
  let classItem = ["item"]
  if(props.active){
    classItem.push("active") 
  }
  return (
      <div className={classItem.join(" ")} onClick={props.clicked}>
          {props.children}
      </div>
    );
};

export default MenuElement;
