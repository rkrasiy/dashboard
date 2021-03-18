import React from "react";
import Button from "../Button/Button"
import "./Product.css"
const Product = (props) => {
  let title,
    price,
    company,
    discount,
    stock,category,model = null;
  
  if(props.title){
    title = (<p className="title">{props.title}</p>)
  }
  
  if(props.company){
    company = (<p className="company-name">{props.company}</p>)
  }
  if(props.discount && props.price != "0" ){
    let oldPrice = Number(props.price);
    let newPrice = oldPrice - (oldPrice / 100) * Number(props.discount)

    discount =  (
      <div>
        <span className="price-striked">{oldPrice}€</span>
        <span className="price">{(newPrice.toFixed(2))}€</span>
        <span className="discount">{props.discount}%</span>
      </div>
    )
  }else if(props.price){
      price = (<p className="price">{props.price}€</p>)
  }

  if(props.stock){
    stock = (<p className="units">{props.stock}</p>)
  }
  if(props.category){
    category = (<p className="category">{props.category}</p>)
  }
  if(props.model){
    model = (<p className="model">{props.model}</p>)
  }

  return (
      <div className="Product">
        <div className="product-view">
          {title}
          {price}
          {discount}
          {company}
          {model}
          {category}
          {stock}
          </div>
        <div className="controls">
          <Button 
            classes="blue" 
            clicked={props.clickedEdit}>Editar</Button>
          <Button 
            classes="red" 
            clicked={props.clickedRemove}>Eliminar</Button>
        </div>
      </div>
    );
};

export default Product;
