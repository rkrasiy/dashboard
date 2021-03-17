import React, {Component} from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner"

import "./Auth.css";
import { updateObject, inputChanged} from "../../shared/utility"
import * as actions from "../../store/actions/index";

class Auth extends Component{
    state = {
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
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "*****"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false
    }
    
    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth( this.state.controls.name.value,this.state.controls.password.value,this.state.isSignup)
        
    }

    inputChangedHandler = (event, controlName) => {
        const updateControls = inputChanged(this.state.controls, controlName, event.target.value)
        this.setState({controls: updateControls})
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=> this.inputChangedHandler(event,formElement.id)}/>
        ))

        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null

        if(this.props.error){
            errorMessage = (
                <p className="message-error">{this.props.error}</p>
            )
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to="/dashboard" />
        }
        return (
            <div className="Auth">
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                <h4 className="title">¡Bienvenido!</h4>
                  {form} 
                {errorMessage}
                <Button btnType="Success" classes="blue fullwidth">Entrar</Button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.userId !== null
    }

}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Auth )