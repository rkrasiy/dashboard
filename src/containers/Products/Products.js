import React, { Component } from "react";
import { connect } from "react-redux";

import Product from "../../components/Product/Product";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal"
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
    let itemsCount = 0;
    let modal = "";
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

    if (!!this.state.openModal) {
      const formElementsArray = [];
      for (let key in this.state.controls) {
        formElementsArray.push({
          id: key,
          config: this.state.controls[key],
        });
      }

      const form = formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      ));

      modal = (
        <div className="modal">
          <form onSubmit={(event) => this.addNewClientHandler(event)}>
            <h4 className="title">{this.state.formTitle}</h4>
            {form}
            <Button 
              btnType="Success" 
              classes="green fullwidth">{this.state.formBtn}
            </Button>
            <Button 
              btnType="Dismiss" 
              classes="red fullwidth" 
              clicked={this.closeModalHandler}>Cancelar
            </Button>
          </form>
        </div>
      );
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
