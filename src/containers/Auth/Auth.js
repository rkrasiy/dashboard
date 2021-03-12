import React, {Component} from 'react';

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import "./Auth.css"
import * as actions from "../../store/actions/index"
class FormAuth extends Component{
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
        formIsValid: false
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
        event.preventDefault()
        
        this.props.onAuth(this.state.controls.name.value,this.state.controls.password.value)
        /*for(let formElement in this.state.controls){
            formData[formElement] = this.state.controls[formElement]
        }

        const order = {
            userData: formData
        }
        console.log("asd", order)*/
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

        let formIsValid = true;
        for(let inputIdentifiers in updateControls){
            formIsValid = updateControls[inputIdentifiers].valid && formIsValid
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

        const form = formElementsArray.map(formElement => (
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
        return (
            <div className="Auth">
                
                <form onSubmit={(event) => this.submitHandler(event)}>
                <h4 className="title">¡Bienvenido!</h4>
                  {form}  
                <Button btnType="Success" classes="blue fullwidth">Submit</Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth())
    }
}

export default FormAuth