import React, { Component } from "react";
import { connect } from "react-redux";

import Product from "../../components/Product/Product";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";

import Spinner from "../../components/Spinner/Spinner";

import * as actions from "../../store/actions/index";
import { checkValidaty, inputChanged, clearInputs} from "../../shared/utility"

export class Products extends Component {
  state = {  
    controls: {
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        focused: false,
        label: "NOMBRE"
      },
      model: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "",
        },
        value: "",
        validation: {
          required: false
        },
        valid: false,
        focused: false,
        label: "MODELO"
      },
      company: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Ej:Samsung, Apple, etc..",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
        },
        valid: false,
        focused: false,
        label: "MARCA"
      },
      discount: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "25%",
        },
        value: "",
        validation: {
          required: true,
          maxLength: 2
        },
        valid: false,
        focused: false,
        label: "DESC. (%)"
      },
      price: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "",
        },
        value: "",
        validation: {
          required: true,
          isNumber: true
        },
        valid: false,
        focused: false,
        label: "PRECIO (€)"
      },
      stock: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "",
        },
        value: "",
        validation: {
          required: true,
          minLength: 1,
        },
        valid: false,
        focused: false,
        label: "STOCK (und)"
      },
    },
    modal: {
      open: false,
      removeConfirm: false,
      newElement: false
    },
    form:{
      isValid: false,
      title: "Nuevo Articulo",
      confirmButton: "Añadir Articulo"
    },
    selectedElement: null
  }
  componentDidMount = () => {
    if(this.props.isAuth)
    this.props.onFetchAllProduct("products")
  }

  openModalHandler = (event, id) => {
    event.preventDefault();
    let formData = {...this.state.controls}
    let form = {...this.state.form}
    let modal = {...this.state.modal}
    let title = "Nuevo Articulo"
    let btn = "Añadir Articulo"
    if(!!id){
      let products = [ ...this.props.products];
      let productIndex = products.findIndex((product) => product.id === id);
      let product = {...products[productIndex]};

      for(let key in product){
         if(!!formData[key]){
          formData[key].value = product[key]
        }
      }
      title = "Editar: " + product.title
      btn = "Guardar"
    }else{
      for(let key in formData){
        formData[key].value = ""
      }
    }
    
    let openModal = this.state.modal.modal;
    let newElement = this.state.modal.newElement;
    form.confirmButton = btn;
    form.title = title;
    modal.open = !openModal;
    modal.newElement = !newElement;

    this.setState({ 
      modal: modal, 
      controls: formData,
      form: form,
      selectedElement: id
    });
  };

  closeModalHandler = (event) => {
    event.preventDefault();
    const updateControls = clearInputs(this.state.controls)
    let modal = {...this.state.modal}
    modal.open = false;
    modal.removeConfirm = false;
    modal.newElement = false;
    this.setState( {modal: modal, controls: updateControls})
  }

  inputChangedHandler = (event, controlName) => {
    const updateControls = inputChanged(this.state.controls, controlName, event.target.value)
    this.setState({controls: updateControls})
  }

  addNewProductHandler = (event, id) => {
    event.preventDefault();
    let formData = [];
    const controls = {...this.state.controls}
    let formIsValid = true;
    let form = {...this.state.form}
    for(let formElement in controls){
      if(controls[formElement].valid){
          formData[formElement] = controls[formElement] 
      }else if(!controls[formElement].valid){
        formIsValid = checkValidaty(controls[formElement].value, controls[formElement].validation)
        if(formIsValid){
          formData[formElement] = controls[formElement] 
        }else{
          controls[formElement].focused = true
        }
      }
    }

    if(!formIsValid){
      form.isValid= formIsValid
      return this.setState({form: form, controls: controls})
    }

    const order = {
        productData: formData
    }
    
    let newProduct = {
      title: order.productData.title.value,
      company:  order.productData.company.value,
      price:  order.productData.price.value,
      stock: order.productData.stock.value,
      discount: order.productData.discount.value,
      model: order.productData.model.value
    };

    if(!!id){
      this.props.onFetchProductEdit(newProduct, "products", id)
    }else{
      this.props.onFetchProductCreate(newProduct, "products")
    }
    this.closeModalHandler(event)
  };

  confirmRemoveHandler = (id) => {
    let modal = {...this.state.modal}
    modal.open = true;
    modal.removeConfirm = true;
    let form = {...this.state.form}
    form.title = "¿Está seguro que desea eliminar?"
    form.confirmButton = "Eliminar"
    this.setState({ modal: modal, selectedElement: id, form: form})
  };
  removeHandler = (event, id) => {
    event.preventDefault();
    this.props.onFetchProductRemove("products",id)
    this.closeModalHandler(event)
  }
  render(){
    let productsList= "";
    let itemsCount = 0;
    let modal = "";
    let selectedElement = this.state.selectedElement;

    if(this.props.products){
      itemsCount = "Total: " + this.props.products.length + " articulos";
      let products = this.props.products.map( (product, index) => (
        <Product 
          key={product.id} 
          title={product.title}
          company={product.company}
          price={product.price}
          discount={product.discount}
          stock={product.stock}
          model={product.model}
          clickedEdit={(event) =>this.openModalHandler(event, product.id)}
          clickedRemove={this.confirmRemoveHandler.bind(this, product.id)}
        />
      ))
      productsList = (<div className="list-items top">{products}</div>)
    }

    if(this.props.loading){
      productsList = <Spinner/>
    }

    if (this.state.modal.open) {
      const formElementsArray = [];
      let inputs = null;
      let func
      if(this.state.modal.newElement){
        for (let key in this.state.controls) {
          formElementsArray.push({
            id: key,
            config: this.state.controls[key],
          });
        }
        
         inputs = formElementsArray.map((formElement) => (
          <Input
            label={formElement.config.label}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            focused={formElement.config.focused}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ));
      }

      if(this.state.modal.newElement)
        func = (event) => this.addNewProductHandler(event, selectedElement)
      else
        func = (event) => this.removeHandler(event, selectedElement)

      modal = (
        <Modal  
          title={this.state.form.title}>
          {inputs}
            <Button 
              btnType="Success" 
              classes="green fullwidth"
              clicked={func}>
                {this.state.form.confirmButton}
            </Button>
            <Button 
              btnType="Dismiss" 
              classes="red fullwidth" 
              clicked={(event) => this.closeModalHandler(event)}>Cancelar
            </Button>
        </Modal>
      );
    }

    return (
      <div className="Products">
        <div className="row right">
          <Button classes="green" clicked={(event) =>this.openModalHandler(event)}>
          <i className="plus inverted icon"></i>Nuevo Articulo
          </Button>
        </div>
        {productsList}
        <div className="count-elements" style={{ textAlign: "right" }}>
          {itemsCount}
        </div>
        {modal}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.product.loading,
    products: state.product.products,
    isAuth: state.auth.userId !== null,
  };
};

const mapDispatchToProps = dispatch => {
    return {
      onFetchAllProduct: (collection) => dispatch(actions.fetchAllProduct(collection)),
      onFetchProductCreate: (data, collection) => dispatch(actions.fetchProductCreate(data, collection)),
      onFetchProductRemove: (collection, id) => dispatch( actions.fetchProductRemove( collection, id)),
      onFetchProductEdit: (data, collection, id) => dispatch (actions.fetchProductEdit(data, collection, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);