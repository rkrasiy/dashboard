import React from "react";
import Button from "../Button/Button"
import "./Product.css"
const Product = (props) => {
  
  return (
      <div className="Product">
        <div className="product-view">{props.number} {props.title} {props.companyName} {props.price}€ {props.offer}</div>
        <div className="controls">
          <Button classes="blue" clicked={props.clickedEdit}>Editar</Button>
          <Button classes="red" clicked={props.clickedRemove}>Eliminar</Button>
        </div>
      </div>
    );
};

export default Product;
