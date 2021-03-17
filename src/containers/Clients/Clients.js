import React, { Component } from "react";
import { connect } from "react-redux";
import Client from "../../components/Client/Client";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions/index";
import { updateObject, checkValidaty, inputChanged, clearInputs} from "../../shared/utility"

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
        touched: false,
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
        touched: false,
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
        touched: false,
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
        touched: false,
      },
    },
    formIsValid: false,
    formTitle: "Nuevo Cliente",
    formBtn: "Crear Nuevo Cliente",
    personId: null
  };

  componentDidMount = () => {
    if(this.props.isAuth)
      this.props.onFetchAll("clients")
  };
  
  openModalHandler = (event, id) => {
    let formData = {...this.state.controls}
    let title = "Nuevo Cliente"
    let btn = "Crear Nuevo Cliente"
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
    
    let openModal = this.state.openModal;
    this.setState({ 
      openModal: !openModal, 
      controls: formData,
      formBtn: btn,
      formTitle: title,
      personId: id
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
  addNewClientHandler = (event, id) => {
    event.preventDefault();
    let formData = [];
    const controls = {...this.state.controls}
    let formIsValid = true;
    for(let formElement in controls){
      if(controls[formElement].valid){
          formData[formElement] = controls[formElement] 
      }else if(!controls[formElement].valid){
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
    this.closeModalHandler()
  };

  removeClientHadler = (id) => {
    this.props.onFetchUserRemove("clients",id)
  };
  
  render() {
    let authRedirect = null;
    let persons = "";
    let itemsCount = 0;
    let modal = "";
    let personId = this.state.personId;
    if(!this.props.isAuth){
      authRedirect = <Redirect to="/" exact/>
    }
    if (!!this.props.clients) {
      itemsCount = "Total: " + this.props.clients.length + " clientes";
      persons = this.props.clients.map((person, index) => (
        <Client
          key={person.id}
          name={person.name}
          last_name={person.last_name}
          email={person.email}
          phone={person.phone_number}
          clickedEdit={(event) =>this.openModalHandler(event,person.id)}
          clickedRemove={this.removeClientHadler.bind(this, person.id)}
        />
      ));
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
          <form onSubmit={(event) => this.addNewClientHandler(event, personId)}>
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
      <div className="Clients">
        {authRedirect}
        <div className="row right">
          <Button classes="green" clicked={(event) =>this.openModalHandler(event)}>
            Nuevo Cliente
          </Button>
        </div>
        <div className="list-items top">{persons}</div>
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
