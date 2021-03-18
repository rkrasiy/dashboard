import React, { Component } from "react";
import { connect } from "react-redux";

import Product from "../../components/Product/Product";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";

import Spinner from "../../components/Spinner/Spinner";

import * as actions from "../../store/actions/index";
import { checkValidaty, inputChanged, clearInputs} from "../../shared/utility"

class Products extends Component {
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
        touched: false,
        label: "Titulo"
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
        touched: false,
        label: "Modelo"
      },
      company: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Samsung",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
        },
        valid: false,
        touched: false,
        label: "Marca"
      },
      category: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
        },
        valid: false,
        touched: false,
        label: "Categoría"
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
        touched: false,
        label: "Discuento (%)"
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
        touched: false,
        label: "Precio"
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
        touched: false,
        label: "Unidades en stock"
      },
    },
    openModal: false,
    formIsValid: false,
    formTitle: "Nuevo Articulo",
    formBtn: "Añadir Articulo",
    productId: null
  }
  componentDidMount = () => {
    if(this.props.isAuth)
    this.props.onFetchAllProduct("products")
  }

  openModalHandler = (event, id) => {
    let formData = {...this.state.controls}
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
    
    let openModal = this.state.openModal;
    this.setState({ 
      openModal: !openModal, 
      controls: formData,
      formBtn: btn,
      formTitle: title,
      productId: id
    });
  };
  closeModalHandler = () => {
    const updateControls = clearInputs(this.state.controls)
    this.setState({ openModal: false, updateControls});
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
    for(let formElement in controls){
      if(controls[formElement].valid){
          formData[formElement] = controls[formElement] 
      }else if(!controls[formElement].valid){
        console.log(controls[formElement])
        formIsValid = checkValidaty(controls[formElement].value, controls[formElement].validation)
        if(formIsValid){
          formData[formElement] = controls[formElement] 
        }else{
          controls[formElement].touched = true
        }
      }
    }

    if(!formIsValid){
      return this.setState({formIsValid: formIsValid, controls: controls})
    }

    const order = {
        productData: formData
    }
    
    let newProduct = {
      title: order.productData.title.value,
      company:  order.productData.company.value,
      price:  order.productData.price.value,
      stock: order.productData.stock.value,
      category: order.productData.category.value,
      discount: order.productData.discount.value,
      model: order.productData.model.value
    };

    if(!!id){
      this.props.onFetchProductEdit(newProduct, "products", id)
    }else{
      this.props.onFetchProductCreate(newProduct, "products")
    }
    this.closeModalHandler()
  };

  removeProductHadler = (id) => {
    this.props.onFetchProductRemove("products",id)
  };
  
  render(){
    let products = "";
    let itemsCount = 0;
    let modal = "";
    let productId = this.state.productId;

    if(this.props.products && !this.state.openModal){
      itemsCount = "Total: " + this.props.products.length + " articulos";
      products = this.props.products.map( (product, index) => (
        <Product 
          key={product.id} 
          title={product.title}
          company={product.company}
          price={product.price}
          discount={product.discount}
          stock={product.stock}
          model={product.model}
          category={product.category}
          clickedEdit={(event) =>this.openModalHandler(event, product.id)}
          clickedRemove={this.removeProductHadler.bind(this, product.id)}
        />
      ))
    }

    if(this.props.loading){
      products = <Spinner/>
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
          label={formElement.config.label}
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
        <Modal 
          submited={(event) => this.addNewProductHandler(event, productId)} 
          title={this.state.formTitle}>
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
        </Modal>
      );
    }

    return (
      <div className="Products">
        <div className="row right">
          <Button classes="green" clicked={(event) =>this.openModalHandler(event)}>
            Nuevo Articulo
          </Button>
        </div>
        <div className="list-items top">{products}</div>
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