import React, { Component } from "react";
import Product from "../../components/Product/Product";
import Button from "../../components/Button/Button";

class Products extends Component {
  state = {
    productos: null
  }
  componentDidMount = () => {
    fetch("http://localhost:3030/products")
      .then(response => {
        return response.json()
      })
      .then( (data)=> {
          this.setState({productos: data})
      })
      .catch(err => {
        console.log(err.message)
        }
      )
      
        console.log("[Products.js] componentDidMount")
  }
 
  addNewProductHandler = () => {
    console.log("add new Product")
  }

  editProductHandler = (id)=>{
    console.log("edit", id)
  }

  removeProductHadler = (id) => {
    console.log("remove", id)
  }

  render(){
    let productos = "";
    let itemsCount = 0
    if(this.state.productos){
      itemsCount = "Total: " + this.state.productos.length + " articulos";
      productos = this.state.productos.map( (product, index) => (
        <Product 
          number={index + 1}
          key={product.id} 
          title={product.title}
          companyName={product.companyName}
          price={product.price}
          offer={product.offer}
          clickedEdit={this.editProductHandler.bind(this, product.id)}
          clickedRemove={this.removeProductHadler.bind(this, product.id)}
        />
      ))
    }
    return (
      <div className="Products">
        <div className="row right">
          <Button 
            classes="green right" 
            clicked={this.addNewProductHandler}>Nuevo Articulo</Button>
        </div>
        <div className="list-items top">
          {productos}
        </div>
        <div className="count-elements" style={{textAlign: "right"}}>
          {itemsCount}
        </div>
      </div>
    )
  }
}
export default Products
