import React from "react";
import Button from "../Button/Button"
import "./Product.css"
const Product = (props) => {
  let title,
    price,
    company,
    discount,
    stock,model = null;
  let classes = ["Product"]
  if(props.classes){
    classes.concat(props.classes)
  }
  if(props.title){
    title = (<span className="title">{props.title}</span>)
  }
  if(props.model){
    model = (<span className="model">{props.model}</span>)
  }
  if(props.company){
    company = (<span className="company-name">{props.company}</span>)
  }
  if(props.discount && props.discount !== "0" ){
    let oldPrice = Number(props.price);
    let newPrice = oldPrice - (oldPrice / 100) * Number(props.discount)

    discount =  (
      <div className="discount-cont">
        <span className="price-striked">{oldPrice}€</span>
        <span className="discount">{props.discount}%</span>
        <span className="price">{(newPrice.toFixed(2))}€</span>
      </div>
    )
  }else if(props.price){
      price = (<span className="price">{props.price}€</span>)
  }
  if(props.stock){
    stock = (<span className="units">Stock ({props.stock})</span>)
  }
 
  

  return (
      <div className={classes.join(" ")}>
        <div className="product-view">
          <div className="main-content">
            {title}
            {model}
            {company}
          </div>
          <div className="supp-info">
            {price}
            {discount}
            {stock}
          </div>
        </div>
        <div className="controls">
          <Button 
            classes="blue" 
            clicked={props.clickedEdit}>
              <i className="edit big inverted icon"></i>Editar</Button>
          <Button 
            classes="red" 
            clicked={props.clickedRemove}>
              <i className="trash inverted icon"></i>Eliminar</Button>
        </div>
      </div>
    );
};

export default Product;
