import React, { Component } from "react";
import { connect } from "react-redux";
import Client from "../../components/Client/Client";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/Spinner/Spinner"

import * as actions from "../../store/actions/index";
import { checkValidaty, inputChanged, clearInputs} from "../../shared/utility"

class Clients extends Component {
  state = {
    openModal: false,
    controls: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nombre",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        focused: false,
      },
      last_name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Apellido",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        focused: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        focused: false,
      },
      phone_number: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Numero tel.",
        },
        value: "",
        validation: {
          required: true,
          minLength: 9,
          maxLength: 9,
          isNumber: true
        },
        valid: false,
        focused: false,
      },
    },
    modal: {
      open: false,
      removeConfirm: false,
      newElement: false
    },
    form:{
      isValid: false,
      title: "Nuevo Cliente",
      confirmButton: "Crear Nuevo Cliente"
    },
    selectedElement: null
  };

  componentDidMount = () => {
    if(this.props.isAuth)
      this.props.onFetchAll("clients")
  };
  
  openModalHandler = (event, id) => {
    let formData = {...this.state.controls}
    let title = "Nuevo Cliente"
    let btn = "Crear Nuevo Cliente"
    let form = {...this.state.form}
    let modal = {...this.state.modal}
    if(!!id){
      let persons = [ ...this.props.clients];
      let personIndex = persons.findIndex((person) => person.id === id);
      let person = {...persons[personIndex]};

      for(let key in person){
         if(!!formData[key]){
          formData[key].value = person[key]
        }
      }
      title = "Editar: " + person.name
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

  addNewClientHandler = (event, id) => {
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
      form.isValid = formIsValid
      return this.setState({form: form, controls: controls})
    }
    const order = {
        userData: formData
    }
    
    let newPerson = {
      name: order.userData.name.value,
      last_name:  order.userData.last_name.value,
      email:  order.userData.email.value,
      phone_number: order.userData.phone_number.value
    };

    if(!!id){
      this.props.onFetchUserEdit(newPerson, "clients", id)
    }else{
      this.props.onFetchUserCreate(newPerson, "clients")
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
    this.props.onFetchUserRemove("clients",id)
    this.closeModalHandler(event)
  }
  
  render() {
    let personsList = "";
    let itemsCount = 0;
    let modal = "";
    let selectedElement = this.state.selectedElement;

    if (!!this.props.clients) {
      itemsCount = "Total: " + this.props.clients.length + " clientes";
      let persons = this.props.clients.map((person, index) => (
        <Client
          key={person.id}
          name={person.name}
          last_name={person.last_name}
          email={person.email}
          phone={person.phone_number}
          clickedEdit={(event) =>this.openModalHandler(event,person.id)}
          clickedRemove={this.confirmRemoveHandler.bind(this, person.id)}
        />
      ));
      personsList = <div className="list-items top">{persons}</div>
    }

    if(this.props.loading){
      personsList = <Spinner/>
    }

    if (this.state.modal.open) {
      const formElementsArray = [];
      let inputs = null;
      let func;

      if(this.state.modal.newElement){
        for (let key in this.state.controls) {
          formElementsArray.push({
            id: key,
            config: this.state.controls[key],
          });
        }
  
        inputs = formElementsArray.map((formElement) => (
          <Input
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
        func = (event) => this.addNewClientHandler(event, selectedElement)
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
      <div className="Clients">
        <div className="row right">
          <Button classes="green" clicked={(event) =>this.openModalHandler(event)}>
            <i className="new-user inverted big icon"></i>Nuevo Cliente
          </Button>
        </div>
        {personsList}
        <div className="count-elements" style={{ textAlign: "right" }}>
          {itemsCount}
        </div>
        {modal}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    clients: state.user.clients,
    isAuth: state.auth.userId !== null,
  };
};

const mapDispatchToProps = dispatch => {
    return {
      onFetchAll: (collection) => dispatch(actions.fetchAll(collection)),
      onFetchUserCreate: (data, collection) => dispatch(actions.fetchUserCreate(data, collection)),
      onFetchUserRemove: (collection, id) => dispatch( actions.fetchUserRemove( collection, id)),
      onFetchUserEdit: (data, collection, id) => dispatch (actions.fetchUserEdit(data, collection, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
