import React from "react";
import MenuElement from "./MenuElement/MenuElement";
import "./Menu.css"

const Menu = (props) => {
  let menuElements = []
  if(props.child)
    menuElements.push(props.child.map( element =>{
      return <MenuElement 
        key={element.id} 
        active={element.active} 
        clicked={() =>props.clicked(element.id)}>
          {element.titleElement}
        </MenuElement>
    }))
  return (
      <div className="Menu">
        {menuElements}
      </div>
    );
};

export default Menu;
