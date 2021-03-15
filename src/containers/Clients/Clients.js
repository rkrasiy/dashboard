import React, { Component } from "react";
import { connect } from "react-redux";
import Client from "../../components/Client/Client";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import * as form from "../../store/form"
import * as server from "../../server"

class Clients extends Component {
  state = {
    clientes: null,
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
    
    console.log(this.props)
    console.log("componentDidMount")
    fetch(server.URL + "/clients")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ clientes: data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  componentDidUpdate = () =>{
    console.log("componentDidUpdate")
  }
  shouldComponentUpdate = (prevState, nextState) => {
    console.log("ShouldComonentUpdate")
    return true
  }
  
  openModalHandler = (event, id) => {
    let formData = {...this.state.controls}
    let title = "Nuevo Cliente"
    let btn = "Crear Nuevo Cliente"
    if(!!id){
      let persons = [ ...this.state.clientes];
      let personIndex = persons.findIndex((person) => person.id === id);
      let person = {...persons[personIndex]};

      for(let key in person){
         if(!!formData[key]){
          formData[key].value = person[key]
        }
      }
      title = "Editar: " + person.name
      btn = "Editar"
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
    const updateControls = form.clearInputs(this.state.controls)
    this.setState({ openModal: false});
  }

  inputHandler = (event, controlName) => {
    const updateControls = form.inputChangedHandler(this.state.controls, controlName, event.target.value)
    this.setState({controls: updateControls})
  }
  addNewClientHandler = (event, id) => {
    event.preventDefault();
    let formData = [];
    let url = server.URL + "/clients";
    let method = "POST";
    let formIsValid = true;
    const controls = {...this.state.controls}
    if(!!id){
      url += "/" + id
      method = "PUT"
    }
    
    for(let formElement in controls){
      if(controls[formElement].valid){
          formData[formElement] = controls[formElement] 
      }else if(!controls[formElement].valid){
        formIsValid = form.checkValidaty(controls[formElement].value, controls[formElement].validation)
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
    
    let persons = [...this.state.clientes];

    let newPerson = {
      name: order.userData.name.value,
      last_name:  order.userData.last_name.value,
      email:  order.userData.email.value,
      phone_number: order.userData.phone_number.value
    };

    fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(newPerson),
    })
      .then((response) => response.json())
      .then((data) => {
        let index = persons.findIndex( person => person.id === data.id)
        if(index !== -1){
          persons[index] = data
        }else{
          persons.push(data);
        }
        this.setState({ clientes: persons,openModal: false });
      })
      .catch((err) => console.log(err));
  };

  removeClientHadler = (id) => {
    let persons = [...this.state.clientes];
    let personIndex = persons.findIndex((person) => person.id === id);
    persons.splice(personIndex, 1);

    fetch("http://localhost:3030/clients/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        response.json();
        if (response.status === 200) {
          this.setState({ clientes: persons });
        }
      })
    
      .catch((err) => console.log(err));
  };
  
  render() {
    let persons = "";
    let itemsCount = 0;
    let modal = "";
    let personId = this.state.personId;

    if (!!this.state.clientes) {

      itemsCount = "Total: " + this.state.clientes.length + " clientes";
      persons = this.state.clientes.map((person, index) => (
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
          changed={(event) => this.inputHandler(event, formElement.id)}
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
        <p>{this.props.newClient}</p>
        <button onClick={this.props.onAddClient}>Click</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.userId !== null
  };
};

const mapDispatchToProps = dispatch => {
    return {
      onAddClient: () => dispatch({type: "ADD"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
