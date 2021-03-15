import React, {Component} from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner"

import "./Auth.css";
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
    checkValidaty = ( value, rules ) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        if(rules.isEmail){
            const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            isValid = pattern.test(value) && isValid
        }

        return isValid
    }
    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth( this.state.controls.name.value,this.state.controls.password.value,this.state.isSignup)
        
    }

    inputChangedHandler = (event, controlName) => {
        //console.log(event.target.value)
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidaty(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        /*const updateFormElement = {...updateControls[id]}
        updateFormElement.value = event.target.value;

        updateFormElement.valid = this.checkValidaty( updateFormElement.value, updateFormElement.validation)
        updateFormElement.touched = true;
        updateControls[id] = updateFormElement;

        let isSignup = true;
        for(let inputIdentifiers in updateControls){
            isSignup = updateControls[inputIdentifiers].valid && isSignup
        }*/
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
                <Button btnType="Success" classes="blue fullwidth">Submit</Button>
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